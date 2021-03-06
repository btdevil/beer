/*    ==Scripting Parameters==

    Source Server Version : SQL Server 2016 (13.0.4206)
    Source Database Engine Edition : Microsoft SQL Server Express Edition
    Source Database Engine Type : Standalone SQL Server

    Target Server Version : SQL Server 2017
    Target Database Engine Edition : Microsoft SQL Server Standard Edition
    Target Database Engine Type : Standalone SQL Server
*/
USE [Beer]
GO
SET IDENTITY_INSERT [dbo].[HopSteps] ON 

INSERT [dbo].[HopSteps] ([ID], [Step], [StepOrder], [HopTypeID], [HopStageID], [HopTime]) VALUES (1, N'Start Boil 0min', 3, 1, 3, N'60')
INSERT [dbo].[HopSteps] ([ID], [Step], [StepOrder], [HopTypeID], [HopStageID], [HopTime]) VALUES (2, N'Middle Boil 30min', 5, 1, 3, N'30')
INSERT [dbo].[HopSteps] ([ID], [Step], [StepOrder], [HopTypeID], [HopStageID], [HopTime]) VALUES (3, N'End Boil 60min', 7, 1, 3, N'0')
INSERT [dbo].[HopSteps] ([ID], [Step], [StepOrder], [HopTypeID], [HopStageID], [HopTime]) VALUES (4, N'Dry Hop', 9, 1, 5, N'4')
INSERT [dbo].[HopSteps] ([ID], [Step], [StepOrder], [HopTypeID], [HopStageID], [HopTime]) VALUES (5, N'Whirlpool', 8, 1, 4, N'0')
INSERT [dbo].[HopSteps] ([ID], [Step], [StepOrder], [HopTypeID], [HopStageID], [HopTime]) VALUES (6, N'15 min', 6, 1, 3, N'15')
INSERT [dbo].[HopSteps] ([ID], [Step], [StepOrder], [HopTypeID], [HopStageID], [HopTime]) VALUES (7, N'Conditioning', 11, 1, 9, N'0')
INSERT [dbo].[HopSteps] ([ID], [Step], [StepOrder], [HopTypeID], [HopStageID], [HopTime]) VALUES (8, N'45 min', 4, 1, 3, N'45')
INSERT [dbo].[HopSteps] ([ID], [Step], [StepOrder], [HopTypeID], [HopStageID], [HopTime]) VALUES (9, N'90 min', 2, 1, 3, N'90')
INSERT [dbo].[HopSteps] ([ID], [Step], [StepOrder], [HopTypeID], [HopStageID], [HopTime]) VALUES (10, N'FV', 10, 1, 7, N'0')
INSERT [dbo].[HopSteps] ([ID], [Step], [StepOrder], [HopTypeID], [HopStageID], [HopTime]) VALUES (11, N'Mash', 1, 1, 2, N'0')
INSERT [dbo].[HopSteps] ([ID], [Step], [StepOrder], [HopTypeID], [HopStageID], [HopTime]) VALUES (12, N'75 min', 7, 1, 3, N'0')
INSERT [dbo].[HopSteps] ([ID], [Step], [StepOrder], [HopTypeID], [HopStageID], [HopTime]) VALUES (13, N'Secondary/Conditioning 6 months', 12, 1, 8, N'0')
INSERT [dbo].[HopSteps] ([ID], [Step], [StepOrder], [HopTypeID], [HopStageID], [HopTime]) VALUES (14, N'Secondary/Conditioning 2 years', 13, 1, 8, N'0')
SET IDENTITY_INSERT [dbo].[HopSteps] OFF
