using CardioApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.ML;

namespace CardioApi.Controllers
{
    public class PatientInput
    {
        public float AgeYears { get; set; }
        public float Gender { get; set; }
        public float Height { get; set; }
        public float Weight { get; set; }
        public float ApHi { get; set; }
        public float ApLo { get; set; }
        public float Cholesterol { get; set; }
        public float Gluc { get; set; }
        public float Smoke { get; set; }
        public float Alco { get; set; }
        public float Active { get; set; }
    }

    [ApiController]
    [Route("[controller]")]
    public class PredictController : ControllerBase
    {
        private readonly PredictionEnginePool<CardioData, CardioPrediction> _predictionEnginePool;

        public PredictController(PredictionEnginePool<CardioData, CardioPrediction> predictionEnginePool)
        {
            _predictionEnginePool = predictionEnginePool;
        }

        [HttpPost]
        public ActionResult<CardioPrediction> Post([FromBody] PatientInput input)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Map DTO to Model Input (converting Age Years -> Days)
            var modelInput = new CardioData
            {
                age = input.AgeYears * 365f, // Convert back to days for the model pipeline
                gender = input.Gender,
                height = input.Height,
                weight = input.Weight,
                ap_hi = input.ApHi,
                ap_lo = input.ApLo,
                cholesterol = input.Cholesterol,
                gluc = input.Gluc,
                smoke = input.Smoke,
                alco = input.Alco,
                active = input.Active
            };

            CardioPrediction prediction = _predictionEnginePool.Predict("CardioModel", modelInput);

            return Ok(new
            {
                HasDisease = prediction.Prediction,
                Probability = prediction.Probability,
                risk = prediction.Prediction ? "High Risk" : "Low Risk"
            });
        }
    }
}
