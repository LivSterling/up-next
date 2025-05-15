const cloudinary = require("../../middleware/cloudinary");
 const {InferenceClient} = require( "@huggingface/inference");
 const {OpenAI} = require( "openai");
 const hfClient = new InferenceClient(process.env.HF_API_KEY); // huggingface token
const client = new OpenAI(process.env.OPENAI_API_KEY);

module.exports = {
    generateSuggestions: async (req, res) => {
        try {
                if (!req.file) {
  return res.status(400).json({ error: "No image uploaded" });
}


          // Upload image to cloudinary
          const result = await cloudinary.uploader.upload(req.file.path);



const chatCompletion = await hfClient.chatCompletion({
    provider: "nebius",
    model: "google/gemma-3-27b-it",
    messages: [
        {
            role: "user",
            content: [
                {
                    type: "text",
                    text: "Describe this garment in detail.",
                },
                {
                    type: "image_url",
                    image_url: {
                        url: result.secure_url,
                    },
                },
            ],
        },
    ],
});

const completion = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
        {
            role: "user",
            content: `You are a fashion designer with expertise in upcycling, DIY garment alterations, and modern streetwear aesthetics. Based on the description below of a real garment, suggest 4 creative and unconventional ways to upcycle or redesign it. Make two of the 4 suggestions beginner friendly and approachable to someone who is new to upcycling. These suggestions can include things like, bleaching, dyeing, distressing, iron on patches, adding gromentss and studs and light only light sewing. For the other 2 suggestions, avoid basic suggestions like cutting pants into shorts or distressing unless it’s part of a larger transformation. Use your understanding of upcycling fashion, inspired by designers known for artistic reconstruction, patchwork, and visible mending. Some examples are Bode, Kapital, Proleta Re Art, and Greg Lauren but make sure your inspiration and refence goes beyond just these names. You do not need to name specific designers. Include details like fabric inserts, sashiko stitching, silhouette changes, patchwork or ways to repurpose the garment into something entirely new, clothing, accessory, or houseware.
Garment description: ${chatCompletion.choices[0].message.content}`,
        },
    ],
});

const description = chatCompletion.choices[0].message.content;
const suggestions = completion.choices[0].message.content;

console.log(chatCompletion.choices[0].message);
console.log(completion.choices[0].message.content);
    
          res.json({
            image: result.secure_url,
            cloudinaryId: result.public_id,
            description: description,
            suggestions: suggestions,

          });
          console.log("Post has been added!");
          
        } catch (err) {
          res.status(500).json({ error: "Something went wrong", details: err.message });
        }
      },

      
}