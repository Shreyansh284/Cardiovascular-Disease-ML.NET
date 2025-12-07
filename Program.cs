using Microsoft.ML;
using Microsoft.ML.Data;
using System;

class Program
{
    static void Main()
    {
        var ml = new MLContext(seed: 1);

        // ✅ 1. Load Data
        var data = ml.Data.LoadFromTextFile<CardioData>(
            path: "D:\\DotNet\\cardiovascular-disease\\Data\\cardio_train.csv",
            hasHeader: true,
            separatorChar: ';');

        // ✅ 2. Outlier Filtering (Medical Cleaning)
        var cleanedData = ml.Data.FilterRowsByColumn(data, nameof(CardioData.ap_hi), 70, 250);
        cleanedData = ml.Data.FilterRowsByColumn(cleanedData, nameof(CardioData.ap_lo), 40, 150);
        cleanedData = ml.Data.FilterRowsByColumn(cleanedData, nameof(CardioData.weight), 30, 200);

        // ✅ 3. Train/Test Split
        var split = ml.Data.TrainTestSplit(cleanedData, testFraction: 0.2);

        // ✅ 4. Full Preprocessing + Training Pipeline
        var pipeline =
            ml.Transforms.ReplaceMissingValues(nameof(CardioData.weight))
            .Append(ml.Transforms.NormalizeMinMax(nameof(CardioData.age)))
            .Append(ml.Transforms.NormalizeMinMax(nameof(CardioData.height)))
            .Append(ml.Transforms.NormalizeMinMax(nameof(CardioData.weight)))
            .Append(ml.Transforms.NormalizeMinMax(nameof(CardioData.ap_hi)))
            .Append(ml.Transforms.NormalizeMinMax(nameof(CardioData.ap_lo)))

            .Append(ml.Transforms.Concatenate("Features",
                nameof(CardioData.age),
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

        // ✅ 5. Train Model
        var model = pipeline.Fit(split.TrainSet);

        // ✅ 6. Evaluate Model
        var predictions = model.Transform(split.TestSet);
        var metrics = ml.BinaryClassification.Evaluate(predictions);

        Console.WriteLine("\n====== MODEL METRICS ======");
        Console.WriteLine($"Accuracy: {metrics.Accuracy}");
        Console.WriteLine($"F1 Score: {metrics.F1Score}");
        Console.WriteLine($"Precision: {metrics.PositivePrecision}");
        Console.WriteLine($"Recall: {metrics.PositiveRecall}");

        Console.WriteLine("\nConfusion Matrix:");
        Console.WriteLine(metrics.ConfusionMatrix.GetFormattedConfusionTable());

        // ✅ 7. Cross Validation
        var cvResults = ml.BinaryClassification.CrossValidate(cleanedData, pipeline, numberOfFolds: 5);
        Console.WriteLine("\nCross Validation Accuracies:");
        foreach (var r in cvResults)
            Console.WriteLine(r.Metrics.Accuracy);

        // ✅ 8. Save Model
        ml.Model.Save(model, split.TrainSet.Schema, "cardio_model.zip");
        Console.WriteLine("\nModel saved as cardio_model.zip");

        // ✅ 9. Load Model
        var loadedModel = ml.Model.Load("cardio_model.zip", out var schema);

        // ✅ 10. Prediction Engine
        var engine = ml.Model.CreatePredictionEngine<CardioData, CardioPrediction>(loadedModel);

        // ✅ 11. Sample Prediction

        Console.WriteLine("\n===== ENTER PATIENT DETAILS =====");

        Console.Write("Age (in days): ");
        float age = float.Parse(Console.ReadLine());

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

        // ✅ Create Input Object
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

        // ✅ Predict
        var result = engine.Predict(input);

        Console.WriteLine("\n===== PREDICTION RESULT =====");
        Console.WriteLine($"Has Cardiovascular Disease? : {result.Prediction}");
        Console.WriteLine($"Probability: {result.Probability}");

        if (result.Prediction)
            Console.WriteLine("⚠️ High Risk: Medical check-up recommended.");
        else
            Console.WriteLine("✅ Low Risk: No immediate concern.");
    }
}

