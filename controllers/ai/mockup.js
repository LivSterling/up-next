const cloudinary = require("../../middleware/cloudinary");
const {writeFile} = require( "fs/promises");
const {Replicate} = require( "replicate");
const replicate = new Replicate(process.env.REPLICATE_API_KEY);

module.exports = {
    generateMockup: async (req, res) => {
        try {
            const input = {
                prompt: `A stylized fashion mockup of a ${data.description}, upcycled using this design: [idea]. Studio lighting, editorial photo style, minimalist background.`
            }
            
            const output = await replicate.run("stability-ai/stable-diffusion-3.5-medium", { input });
            for (const [index, item] of Object.entries(output)) {
              await writeFile(`output_${index}.webp`, item);
            };
            //=> output_0.webp written to disk
        } catch (err) {
            res.status(500).json({ error: "Something went wrong", details: err.message });
          }
        }
    }
    
    