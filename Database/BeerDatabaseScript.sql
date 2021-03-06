/*    ==Scripting Parameters==

    Source Server Version : SQL Server 2016 (13.0.4206)
    Source Database Engine Edition : Microsoft SQL Server Express Edition
    Source Database Engine Type : Standalone SQL Server

    Target Server Version : SQL Server 2016
    Target Database Engine Edition : Microsoft SQL Server Express Edition
    Target Database Engine Type : Standalone SQL Server
*/

USE [master]
GO

/****** Object:  Database [Beer]    Script Date: 02/10/2017 10:06:04 ******/
CREATE DATABASE [Beer]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Beer', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.SQLEXPRESS2016\MSSQL\DATA\Beer.mdf' , SIZE = 73728KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Beer_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.SQLEXPRESS2016\MSSQL\DATA\Beer_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO

ALTER DATABASE [Beer] SET COMPATIBILITY_LEVEL = 130
GO

IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Beer].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO

ALTER DATABASE [Beer] SET ANSI_NULL_DEFAULT OFF 
GO

ALTER DATABASE [Beer] SET ANSI_NULLS OFF 
GO

ALTER DATABASE [Beer] SET ANSI_PADDING OFF 
GO

ALTER DATABASE [Beer] SET ANSI_WARNINGS OFF 
GO

ALTER DATABASE [Beer] SET ARITHABORT OFF 
GO

ALTER DATABASE [Beer] SET AUTO_CLOSE OFF 
GO

ALTER DATABASE [Beer] SET AUTO_SHRINK OFF 
GO

ALTER DATABASE [Beer] SET AUTO_UPDATE_STATISTICS ON 
GO

ALTER DATABASE [Beer] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO

ALTER DATABASE [Beer] SET CURSOR_DEFAULT  GLOBAL 
GO

ALTER DATABASE [Beer] SET CONCAT_NULL_YIELDS_NULL OFF 
GO

ALTER DATABASE [Beer] SET NUMERIC_ROUNDABORT OFF 
GO

ALTER DATABASE [Beer] SET QUOTED_IDENTIFIER OFF 
GO

ALTER DATABASE [Beer] SET RECURSIVE_TRIGGERS OFF 
GO

ALTER DATABASE [Beer] SET  DISABLE_BROKER 
GO

ALTER DATABASE [Beer] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO

ALTER DATABASE [Beer] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO

ALTER DATABASE [Beer] SET TRUSTWORTHY OFF 
GO

ALTER DATABASE [Beer] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO

ALTER DATABASE [Beer] SET PARAMETERIZATION SIMPLE 
GO

ALTER DATABASE [Beer] SET READ_COMMITTED_SNAPSHOT OFF 
GO

ALTER DATABASE [Beer] SET HONOR_BROKER_PRIORITY OFF 
GO

ALTER DATABASE [Beer] SET RECOVERY SIMPLE 
GO

ALTER DATABASE [Beer] SET  MULTI_USER 
GO

ALTER DATABASE [Beer] SET PAGE_VERIFY CHECKSUM  
GO

ALTER DATABASE [Beer] SET DB_CHAINING OFF 
GO

ALTER DATABASE [Beer] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO

ALTER DATABASE [Beer] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO

ALTER DATABASE [Beer] SET DELAYED_DURABILITY = DISABLED 
GO

ALTER DATABASE [Beer] SET QUERY_STORE = OFF
GO

USE [Beer]
GO

ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO

ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = PRIMARY;
GO

ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO

ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
GO

ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO

ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = PRIMARY;
GO

ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO

ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = PRIMARY;
GO

ALTER DATABASE [Beer] SET  READ_WRITE 
GO

