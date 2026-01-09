using Microsoft.ML;
using Microsoft.ML.Data;
using System;
using System.IO;

class Program
{
    public class AgeInput
    {
        public float age { get; set; }
    }

    public class AgeOutput
    {
        public float age_years { get; set; }
    }

    static void Main()
    {
        var ml = new MLContext(seed: 1);

        // Load Data
        var data = ml.Data.LoadFromTextFile<CardioData>(
            path: "D:\\DotNet\\cardiovascular-disease\\Data\\cardio_train.csv",
            hasHeader: true,
            separatorChar: ';');

        // Outlier Filtering (Medical Cleaning)
        var cleanedData = ml.Data.FilterRowsByColumn(data, nameof(CardioData.ap_hi), 70, 250);
        cleanedData = ml.Data.FilterRowsByColumn(cleanedData, nameof(CardioData.ap_lo), 40, 150);
        cleanedData = ml.Data.FilterRowsByColumn(cleanedData, nameof(CardioData.weight), 30, 200);

        // Train/Test Split
        var split = ml.Data.TrainTestSplit(cleanedData, testFraction: 0.2);

        string modelPath = "cardio_model.zip";
        ITransformer model;

        Console.WriteLine("Training new model...");

        // Full Preprocessing + Training Pipeline
        var pipeline =
            ml.Transforms.ReplaceMissingValues(nameof(CardioData.weight))
            // Convert Age (days) to Age (years) - REMOVED, using age (days) directly as it is normalized anyway
            //.Append(ml.Transforms.CustomMapping<AgeInput, AgeOutput>(
            //    (input, output) => output.age_years = input.age / 365f, 
            //    "AgeMapping"))
            //.Append(ml.Transforms.NormalizeMinMax("age_years"))
            .Append(ml.Transforms.NormalizeMinMax(nameof(CardioData.age))) // Normalize age (days)
            .Append(ml.Transforms.NormalizeMinMax(nameof(CardioData.height)))
            .Append(ml.Transforms.NormalizeMinMax(nameof(CardioData.weight)))
            .Append(ml.Transforms.NormalizeMinMax(nameof(CardioData.ap_hi)))
            .Append(ml.Transforms.NormalizeMinMax(nameof(CardioData.ap_lo)))

            .Append(ml.Transforms.Concatenate("Features",
                nameof(CardioData.age), // Use age (days)
                nameof(CardioData.gender),
                nameof(CardioData.height),
                nameof(CardioData.weight),
                nameof(CardioData.ap_hi),
                nameof(CardioData.ap_lo),
                nameof(CardioData.cholesterol),
                nameof(CardioData.gluc),
                nameof(CardioData.smoke),
                nameof(CardioData.alco),
                nameof(CardioData.active)
            ))

            .Append(ml.BinaryClassification.Trainers.FastTree());

        // Train Model
        model = pipeline.Fit(split.TrainSet);

        // Cross Validation
        var cvResults = ml.BinaryClassification.CrossValidate(cleanedData, pipeline, numberOfFolds: 5);
        Console.WriteLine("\nCross Validation Accuracies:");
        foreach (var r in cvResults)
            Console.WriteLine(r.Metrics.Accuracy);

        // Save Model
        ml.Model.Save(model, split.TrainSet.Schema, modelPath);
        Console.WriteLine($"\nModel saved as {modelPath}");

        // Evaluate Model
        var predictions = model.Transform(split.TestSet);
        var metrics = ml.BinaryClassification.Evaluate(predictions);

        Console.WriteLine("\n====== MODEL METRICS ======");
        Console.WriteLine($"Accuracy: {metrics.Accuracy}");
        Console.WriteLine($"F1 Score: {metrics.F1Score}");
        Console.WriteLine($"Precision: {metrics.PositivePrecision}");
        Console.WriteLine($"Recall: {metrics.PositiveRecall}");

        Console.WriteLine("\nConfusion Matrix:");
        Console.WriteLine(metrics.ConfusionMatrix.GetFormattedConfusionTable());

        //  Prediction Engine
        var engine = ml.Model.CreatePredictionEngine<CardioData, CardioPrediction>(model);

        //  Sample Prediction

        Console.WriteLine("\n===== ENTER PATIENT DETAILS =====");

        Console.Write("Age (in years): ");
        float ageYears = float.Parse(Console.ReadLine());
        float age = ageYears * 365f; // Convert back to days for the CardioData input object

        Console.Write("Gender (1 = Female, 2 = Male): ");
        float gender = float.Parse(Console.ReadLine());

        Console.Write("Height (cm): ");
        float height = float.Parse(Console.ReadLine());

        Console.Write("Weight (kg): ");
        float weight = float.Parse(Console.ReadLine());

        Console.Write("Systolic BP (ap_hi): ");
        float ap_hi = float.Parse(Console.ReadLine());

        Console.Write("Diastolic BP (ap_lo): ");
        float ap_lo = float.Parse(Console.ReadLine());

        Console.Write("Cholesterol (1 = normal, 2 = above normal, 3 = well above normal): ");
        float cholesterol = float.Parse(Console.ReadLine());

        Console.Write("Glucose (1 = normal, 2 = above normal, 3 = well above normal): ");
        float gluc = float.Parse(Console.ReadLine());

        Console.Write("Smoker? (1 = Yes, 0 = No): ");
        float smoke = float.Parse(Console.ReadLine());

        Console.Write("Alcohol intake? (1 = Yes, 0 = No): ");
        float alco = float.Parse(Console.ReadLine());

        Console.Write("Physically Active? (1 = Yes, 0 = No): ");
        float active = float.Parse(Console.ReadLine());

        // ate Input Object
        var input = new CardioData
        {
            age = age,
            gender = gender,
            height = height,
            weight = weight,
            ap_hi = ap_hi,
            ap_lo = ap_lo,
            cholesterol = cholesterol,
            gluc = gluc,
            smoke = smoke,
            alco = alco,
            active = active
        };

        // dict
        var result = engine.Predict(input);

        Console.WriteLine("\n===== PREDICTION RESULT =====");
        Console.WriteLine($"Has Cardiovascular Disease? : {result.Prediction}");
        Console.WriteLine($"Probability: {result.Probability}");

        if (result.Prediction)
            Console.WriteLine("⚠️ High Risk: Medical check-up recommended.");
        else
            Console.WriteLine(" Risk: No immediate concern.");
    }
}

