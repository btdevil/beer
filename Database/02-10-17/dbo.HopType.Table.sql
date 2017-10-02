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
SET IDENTITY_INSERT [dbo].[HopType] ON 

INSERT [dbo].[HopType] ([ID], [HopTypeName]) VALUES (1, N'Pellet')
INSERT [dbo].[HopType] ([ID], [HopTypeName]) VALUES (2, N'Leaf')
INSERT [dbo].[HopType] ([ID], [HopTypeName]) VALUES (3, N'Other')
SET IDENTITY_INSERT [dbo].[HopType] OFF
