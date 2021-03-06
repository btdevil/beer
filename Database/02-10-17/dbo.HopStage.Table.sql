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
SET IDENTITY_INSERT [dbo].[HopStage] ON 

INSERT [dbo].[HopStage] ([ID], [HopStageName]) VALUES (1, N'First Wort')
INSERT [dbo].[HopStage] ([ID], [HopStageName]) VALUES (2, N'Mash')
INSERT [dbo].[HopStage] ([ID], [HopStageName]) VALUES (3, N'Boil')
INSERT [dbo].[HopStage] ([ID], [HopStageName]) VALUES (4, N'Hop Stand')
INSERT [dbo].[HopStage] ([ID], [HopStageName]) VALUES (5, N'Dry Hop')
INSERT [dbo].[HopStage] ([ID], [HopStageName]) VALUES (6, N'Flame Out')
INSERT [dbo].[HopStage] ([ID], [HopStageName]) VALUES (7, N'Primary')
INSERT [dbo].[HopStage] ([ID], [HopStageName]) VALUES (8, N'Secondary')
INSERT [dbo].[HopStage] ([ID], [HopStageName]) VALUES (9, N'Bottle')
SET IDENTITY_INSERT [dbo].[HopStage] OFF
