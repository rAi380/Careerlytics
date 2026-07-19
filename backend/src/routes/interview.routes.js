const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const interviewController = require("../controllers/interview.controller")
const interviewRouter = express.Router();
const upload = require('../middlewares/file.middleware')

interviewRouter.post("/",authMiddleware.authUser,upload.single("resume"),interviewController.generateInterViewReportController)
interviewRouter.get("/report/:interviewId",authMiddleware.authUser,interviewController.getInterviewReportByIdController)
interviewRouter.get("/",authMiddleware.authUser,interviewController.getAllInterviewReportsController)
interviewRouter.post("/resume/pdf/:interviewReportId",authMiddleware.authUser,interviewController.generateResumePdfController)
interviewRouter.delete("/:interviewId",authMiddleware.authUser,interviewController.deleteInterviewReportController)
interviewRouter.post("/report/pdf/:interviewReportId", authMiddleware.authUser, interviewController.generateReportPdfController)
module.exports = interviewRouter