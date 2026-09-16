// save jd
const saveJobDescription = async (req, res) => {
  try {
    const { jobDescription } = req.body;

    if (!jobDescription || jobDescription.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Job description is required",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job description received successfully",
      jobDescription,
    });
  } catch (error) {
    console.log(`error from controller save jd ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export { saveJobDescription };
