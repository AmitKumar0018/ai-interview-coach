import fs from "fs";
import PDFParser from "pdf2json";

// upload resume
const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume PDF is required",
      });
    }

    // const fileBuffer = fs.readFileSync(req.file.path);

    // const pdfData = await pdfParse(fileBuffer);

    const pdfParser = new PDFParser();

    const resumeText = await new Promise((resolve, reject) => {
      pdfParser.on("pdfParser_dataError", (error) => {
        reject(error);
      });

      pdfParser.on("pdfParser_dataReady", (pdfData) => {
        let text = "";

        pdfData.Pages.forEach((page) => {
          page.Texts.forEach((item) => {
            item.R.forEach((run) => {
              try {
                text += decodeURIComponent(run.T) + " ";
              } catch {
                text += run.T + " ";
              }
            });
          });
        });

        resolve(text);
      });

      pdfParser.loadPDF(req.file.path);
    });

    return res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      fileName: req.file.filename,
      resumeText,
    });
  } catch (error) {
    console.log(`error from controller upload resume ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export { uploadResume };
