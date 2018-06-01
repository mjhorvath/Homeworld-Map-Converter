// Copyright (C) 2005  Michael Horvath

// This library is free software; you can redistribute it and/or
// modify it under the terms of the GNU Lesser General Public
// License as published by the Free Software Foundation; either
// version 2.1 of the License, or (at your option) any later version.

// This library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
// Lesser General Public License for more details.

// You should have received a copy of the GNU Lesser General Public
// License along with this library; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 
// 02110-1301  USA

// NOTE: I need to check versus the style *names* instead of IDs if I 
// want the code to still work after re-indexing the "styles" table.

// Title: HW1/HWC to HWRM Map Converter
// Version: 1.0.1
// Author: Mikali
// Created: 2005/09/20
// Updated: 2015/03/18
// Homepage: http://isometricland.net/homeworld/homeworld.php
// Discussion: http://forums.relicnews.com/showthread.php?t=73533

var ScriptVersion = "1.0.1"
var DescExists = false
var PrintFunc = false
var PrintVarb = false
var MssgDebug = false
var RUsRatio = "1"
var PebRatio = "7/8"
var NebRatio = "1/100"
var SourceGame = "HW1"

var MisLineCount = 0
var ResLineCount = 0
var PlayerCount = 0

var OutString = ""

var DistTable = []
var SquaTable = []
var DerlTable = []
var CrysTable = []
var ResoTable = []
var NebuTable = []
var DescTable = []
var sShpTable = []
var sPtsTable = [[],[],[],[],[],[],[],[]]
var sRacTable = ["","","","","","","",""]

var SquaCount = 0
var DerlCount = 0
var CrysCount = 0
var ResoCount = 0
var NebuCount = 0
var DescCount = 0
var sShpCount = 0
var sPtsCount = [0,0,0,0,0,0,0,0]

var SensorsZoom = [0,0]
var UniverseSize = [0,0,0]
var LevelName = "Unknown Level"
var LevelMusic = ""
var LevelBackground = ""

// set up file objects
var ProgArgs = WScript.Arguments
var fso = WScript.CreateObject('Scripting.FileSystemObject')
var WshShell = WScript.CreateObject('WScript.Shell')

if (ProgArgs != null)
{
	// process the command-line arguments
	var SRCPath = ProgArgs(0)
	for (var i = 1; i < ProgArgs.length; i ++)
	{
		if (ProgArgs(i) == "-debug")		MssgDebug = true
		else if (ProgArgs(i) == "-printfuncs")	PrintFunc = true
		else if (ProgArgs(i) == "-printvarbs")	PrintVarb = true
		else if (ProgArgs(i) == "-rus")		RUsRatio = ProgArgs(i + 1)
		else if (ProgArgs(i) == "-peb")		PebRatio = ProgArgs(i + 1)
		else if (ProgArgs(i) == "-neb")		NebRatio = ProgArgs(i + 1)
		else if (ProgArgs(i) == "-game")	SourceGame = ProgArgs(i + 1)
	}

	// determine the paths
	var PathIndex = SRCPath.lastIndexOf("\\") + 1
	var ROOTPath = SRCPath.substring(0, PathIndex)
	var FILEName = SRCPath.substring(PathIndex, SRCPath.length)
	var SCRIPTPath = WScript.ScriptFullName
	var LOCALPath = SCRIPTPath.substring(0, SCRIPTPath.lastIndexOf("\\") + 1)
	var DESCPath = ROOTPath + "Description.txt"
	var DEBGPath = LOCALPath + "Debug.log"
	var VARBPath = LOCALPath + "IncVariables.lua"	// outdated
	var FUNCPath = LOCALPath + "levelfunc.lua"

	// read the source level file and store it as a string
	var LevlObject = fso.OpenTextFile(SRCPath, 1)
	var LevlString = LevlObject.ReadAll() + "\n"
	LevlString = LevlString.replace("\r", "")
	LevlObject.Close()

	// read the source description.txt and store it as a string
	DescExists = fso.FileExists(DESCPath)
	var DescObject = null
	var DescString = ""
	if (DescExists == true)
	{
		DescObject = fso.OpenTextFile(DESCPath, 1)
		DescString = DescObject.ReadAll() + "\n"
		DescString = DescString.replace("\r", "")
		DescObject.Close()
	}

	// adjust the output path depending on the command-line arguments
	var OutPath = ""
	if (ProgArgs.length > 1)
		OUTPath = ProgArgs(1)
	else
		OUTPath = ROOTPath + SourceGame + "_" + FILEName

	// initialize the debug file
	if (MssgDebug == true)
	{
		var DebugObject = fso.OpenTextFile(DEBGPath, 2, 1, 0)
		DebugObject.Write("")
		DebugObject.Close()
	}

	DebugWrite("Now Parsing:\n\t" + SRCPath + "\n")

	ParseLevel(LevlString)
	ParseDescription(DescString)
	PrintCreatedUsing()
	PrintDescriptions()
	PrintLevelName()
	PrintLevelFile()
	PrintSourceGame()
	PrintNumberOfPlayers()
	PrintSensorsZoom()
	PrintUniverseSize()
	PrintBackground()
	PrintMusic()
	PrintRUsPebs()
	PrintRaces()
	PrintStartPoints()
	PrintStartShips()
	PrintSquadrons()
	PrintDerelicts()
	PrintCrystals()
	PrintDistributions()
	PrintResources()
	PrintNebulas()
	PrintVariables()
	PrintFunctions()

	// write the output to file
	if (OutString != '')
	{
		var OutputObject = fso.OpenTextFile(OUTPath, 2, 1, 0)
		OutString = OutString.replace(/\n/gm, "\r\n")
		OutputObject.Write(OutString)
		OutputObject.Close()
	}
	DebugWrite("\nFinished converting level.\n")
}

function ParseDescription(TempString)
{
	var TempIndex = 0
	var TempString2 = ""
	var TempMatch = null
	var TempRegex = /^\w+/

	while (TempString.length > 0)
	{
		TempIndex = TempString.indexOf("\n") + 1
		TempString2 = TempString.substring(0, TempIndex)
		TempMatch = TempString2.match(TempRegex)

		if ((TempMatch) && (TempMatch[0].toLowerCase() == "description"))
			DescTable[DescCount++] = TempString2.replace(/Description\s*/, '').replace(/[\r\n]+/g, '').replace(/\&(\w)/g, '$1').replace(/(\w)\&/g, '$1')

		TempString = TempString.substring(TempIndex, TempString.length)
	}
}

function ParseLevel(TempString)
{
	var TempIndex = 0
	var TempString2 = ""
	var LowcString2 = ""
	var TempMatch = null
	var TempRegex = /^\w+/

	while (TempString.length > 0)
	{
		TempIndex = TempString.indexOf("\n") + 1
		TempString2 = TempString.substring(0, TempIndex).replace(/\s+$/gm, '')
		LowcString2 = TempString2.toLowerCase()
		TempMatch = TempString2.match(TempRegex)

		if (TempMatch)
		{
			var TempMatch0 = TempMatch[0].toLowerCase()
			if (TempMatch0 == "missionsphere")
			{
				var CodeString = LowcString2.replace(/missionsphere\s*/, '')
				var CodeArray = CodeString.split(',')
				var Plyr = CodeArray[0]
				var Race = CodeArray[1]
				var Type = CodeArray[2]
				var File = CodeArray[8]
				var MispPath = ROOTPath + File
				DebugWrite("\n\tNow parsing:\n\t\t" + MispPath + "\n")
				var MispObject = fso.OpenTextFile(MispPath, 1)
				var MispString = MispObject.ReadAll() + "\n"
				MispObject.Close()
				MispString = MispString.replace("\r", "")
				MisLineCount = 1
				if ((Plyr != -1) && ((Type == "mothership") || (Type == "smothership") || (Type == "carrier") || (Type == "scarrier")))
				{
					sRacTable[PlayerCount] = Race
					PlayerCount += 1
					ParseMothershipMissphere(MispString, Plyr)
				}
				else if (Type == "resourcesphere")
					ParseResourceMissphere(MispString, Plyr)
			}
			else if (TempMatch0 == "smzoommin")
				SensorsZoom[0] = LowcString2.replace(/smzoommin\s*/g, '')
			else if (TempMatch0 == "smzoommax")
				SensorsZoom[1] = LowcString2.replace(/smzoommax\s*/g, '')
			else if (TempMatch0 == "smuniversesizex")
				UniverseSize[0] = LowcString2.replace(/smuniversesizex\s*/g, '')
			else if (TempMatch0 == "smuniversesizey")
				UniverseSize[1] = LowcString2.replace(/smuniversesizey\s*/g, '')
			else if (TempMatch0 == "smuniversesizez")
				UniverseSize[2] = LowcString2.replace(/smuniversesizez\s*/g, '')
			else if (TempMatch0 == "songnumber")
				LevelMusic = LowcString2.replace(/songnumber\s*/g, '').toLowerCase()
			else if (TempMatch0 == "background")
				LevelBackground = LowcString2.replace(/background\s*/g, '').replace(/\./g, '\_').toLowerCase().split(',')[0]			// remove '.' from filenames
		}
		else if (TempString2.match(/^\[/))
			LevelName = TempString2.replace(/\[\[/g, "[").replace(/\]\]/g, "]").replace(/(\w)\&/g, "$1").replace(/\&(\w)/g, "$1").replace(/^\s+/g, "").replace(/\n+/g, "")

		TempString = TempString.substring(TempIndex, TempString.length)
	}
}

function ParseMothershipMissphere(TempString, Plyr)
{
	TempString = TempString.toLowerCase()
	var TempIndex = 0
	var TempString2 = ""
	var LowcString2 = ""
	var TempMatch = null
	var TempRegex = /^\w+/

	while (TempString.length > 0)
	{
		TempIndex = TempString.indexOf("\n") + 1
		TempString2 = TempString.substring(0, TempIndex)
		LowcString2 = TempString2
		TempMatch = TempString2.match(TempRegex)

		if ((TempMatch) && (TempMatch[0] == "ships"))
		{
			DebugWrite("\tLine " + (MisLineCount++) + ":\n\t\t" + TempString2)
			AddMotherShips(TempString2, Plyr)
		}
	
		TempString = TempString.substring(TempIndex, TempString.length)
	}
}

function ParseResourceMissphere(TempString, Plyr)
{
	TempString = TempString.toLowerCase()
	var TempIndex = 0
	var TempString2 = ""
	var TempMatch = null
	var TempRegex = /^\w+/

	while (TempString.length > 0)
	{
		TempIndex = TempString.indexOf("\n") + 1
		TempString2 = TempString.substring(0, TempIndex)
		TempMatch = TempString2.match(TempRegex)

		if (TempMatch)
		{
			var TempMatch0 = TempMatch[0]
			DebugWrite("\tLine " + (MisLineCount++) + ":\n\t\t" + TempString2)
			// still no support for Slipgate, mine, MeteorStorm
			if (TempMatch0 == "ships")
				AddShips(TempString2, Plyr)
			else if (TempMatch0 == "resources")
				AddResources(TempString2)
			else if (TempMatch0 == "derelict")
				AddDerelicts(TempString2)
		}

		TempString = TempString.substring(TempIndex, TempString.length)
	}
}

function ParseDistribution(TempString, DistName)
{
	var TempRegex = /(^\w+)\s*(\w+)[^a-zA-Z]*$/
	var TempIndex = TempString.indexOf("\n") + 1
	var TempString2 = TempString.substring(0, TempIndex)
	var TempMatch = TempString2.match(TempRegex)

	while (TempString.length > 0)
	{
		if (TempMatch != null)
		{
			var TempMatch0 = TempMatch[0]
			DebugWrite("\t\tLine " + ResLineCount + ":\n\t\t\t" + TempMatch0 + "\n")
			ResLineCount += 1
			var Type = TempString2.replace(TempRegex, "$1")
			var Amnt = TempString2.replace(TempRegex, "$2")
			Type = Type.toLowerCase()
			DistTable[DistName].push([Type, Amnt])
		}

		TempString = TempString.substring(TempIndex, TempString.length)
		TempIndex = TempString.indexOf("\n") + 1
		TempString2 = TempString.substring(0, TempIndex)
		TempMatch = TempString2.match(TempRegex)
	}
}

function AddMotherShips(TempString, Plyr)
{
	TempString = TempString.toLowerCase().replace(/\s/g, '')
	var StringArray = TempString.split(',')
	var Name = StringArray[0].replace('ships', '')
	var XCoo = StringArray[1]
	var YCoo = StringArray[2]
	var ZCoo = StringArray[3]
	var ZAng = StringArray[4]
	var Race = StringArray[5]
	var Type = StringArray[6]
	var Amnt = StringArray[7]
	var Brackets = StringArray[8].split('|')
	var Form = Brackets[0]
	var Flag = Brackets[1]
	if ((Flag == "useasmothership") || (Type == "mothership") || (Type == "carrier") || (Type == "smothership") || (Type == "scarrier"))
	{
		if (sPtsCount[Plyr] == 0)
		{
			sPtsTable[Plyr] = [XCoo, YCoo, ZCoo, ZAng]
			sPtsCount[Plyr] = 1
		}
		sShpTable[sShpCount++] = [Amnt, Name, Type, XCoo, YCoo, ZCoo, Plyr, 0, ZAng, Race, Form]
	}
	else
		sShpTable[sShpCount++] = [Amnt, Name, Type, 0, 0, 0, Plyr, 0, 0, Race, Form]
}

function AddShips(TempString, Plyr)
{
	TempString = TempString.toLowerCase().replace(/\s/g, '')
	var StringArray = TempString.split(',')
	var Name = StringArray[0].replace('ships', '')
	var XCoo = StringArray[1]
	var YCoo = StringArray[2]
	var ZCoo = StringArray[3]
	var ZAng = StringArray[4]
	var Race = StringArray[5]
	var Type = StringArray[6]
	var Amnt = StringArray[7]
	var Brackets = StringArray[8].split('|')
	var Form = Brackets[0]
	if ((Type == "dcrystal0") || (Type == "dcrystal1"))
		CrysTable[CrysCount++] = [Amnt, Name, Type, XCoo, YCoo, ZCoo, 0, ZAng]
	else
		SquaTable[SquaCount++] = [Amnt, Name, Type, XCoo, YCoo, ZCoo, Plyr, 0, ZAng, Race, Form]
}

function AddDerelicts(TempString)
{
	TempString = TempString.toLowerCase().replace(/\s/g, '')
	var StringArray = TempString.split(',')
	var Type = StringArray[0].replace('derelict', '')
	var XCoo = StringArray[1]
	var YCoo = StringArray[2]
	var ZCoo = StringArray[3]
	var YAng = StringArray[4]
	var ZAng = StringArray[5]
	DerlTable[DerlCount++] = [Type, XCoo, YCoo, ZCoo, -1, YAng, ZAng]
}

function AddResources(TempString)
{
	TempString = TempString.toLowerCase().replace(/\s/g, '')
	var StringArray = TempString.split(',')
	var Type = StringArray[0].replace('resources', '')
	var XCoo = StringArray[1]
	var YCoo = StringArray[2]
	var ZCoo = StringArray[3]
	var Lyot = StringArray[4]
	var Dist = StringArray[5]
	var ResA = StringArray[6]
	var Radi = StringArray[7]
	var Leng = StringArray[8]
	var YAng = StringArray[9]
	var ZAng = StringArray[10]
	if (Lyot == "nebula")
	{
		AddNebulas(TempString)
	}
	else
	{
		var DistPath = ROOTPath + Dist
		var DistName = Dist.substring(0, Dist.indexOf("\."))
		if (isNaN(DistName) == false)
			DistName = "_" + DistName
		if (!DistTable[DistName])
		{
			DebugWrite("\n\t\tNow parsing:\n\t\t\t" + DistPath + "\n")
			var DistObject = fso.OpenTextFile(DistPath, 1)
			var DistString = DistObject.ReadAll() + "\n"
			DistObject.Close()
			DistString = DistString.replace("\r", "")
			DistTable[DistName] = []
			ResLineCount = 1
			ParseDistribution(DistString, DistName)
		}
		ResoTable[ResoCount++] = [XCoo, YCoo, ZCoo, Lyot, DistName, ResA, Radi, Leng, YAng, ZAng]
	}
}

function AddNebulas(TempString)
{
	var StringArray = TempString.split(',')
	var Type = StringArray[0].replace('resources', '')
	var XCoo = StringArray[1]
	var YCoo = StringArray[2]
	var ZCoo = StringArray[3]
	var Lyot = StringArray[4]
	var Dist = StringArray[5]
	var TNum = StringArray[6]
	var XSiz = StringArray[7]
	var YSiz = StringArray[8]
	var ZSiz = StringArray[9]
	var CNum = StringArray[10]
	var DistPath = ROOTPath + Dist
	var DistName = Dist.substring(0, Dist.indexOf("\."))
	if (isNaN(DistName) == false)
		DistName = "_" + DistName
	if (!DistTable[DistName])
	{
		DebugWrite("\n\t\tNow parsing:\n\t\t\t" + DistPath + "\n")
		var DistObject = fso.OpenTextFile(DistPath, 1)
		var DistString = DistObject.ReadAll() + "\n"
		DistObject.Close()
		DistString = DistString.replace("\r", "")
		DistTable[DistName] = []
		ResLineCount = 1
		ParseDistribution(DistString, DistName)
	}
	NebuTable[NebuCount++] = [XCoo, YCoo, ZCoo, Lyot, DistName, TNum, XSiz, YSiz, ZSiz, CNum]
}

function PrintCreatedUsing()
{
	var d = new Date()
	OutString += "\-\- Converted using HW1/HWC to HWRM Map Converter version " + ScriptVersion + " by Mikali on " + d.toLocaleDateString() + ".\n\n"
}

function PrintDescriptions()
{
	OutString += "Description =\n[[\n"
	for (var m in DescTable)
		OutString += DescTable[m] + "\n"
	OutString += "]]\n\n"
}

function PrintLevelName()
{
	OutString += "LevelName = [[" + LevelName + "]]\n"
}

function PrintLevelFile()
{
	OutString += "LevelFile = [[" + FILEName.replace(".level", "") + "]]\n"
}

function PrintSourceGame()
{
	OutString += "SourceGame = \"" + SourceGame + "\"\n"
}

function PrintNumberOfPlayers()
{
	OutString += "NumberOfPlayers = " + PlayerCount + "\n\n"
}

function PrintBackground()
{
	OutString += "LevelBackground = \"" + LevelBackground + "\"\n"
}

function PrintMusic()
{
	OutString += "LevelMusic = \"" + LevelMusic + "\"\n\n"
}

function PrintRUsPebs()
{
	OutString += "RUsRatio = " + RUsRatio + "\n"
	OutString += "PebRatio = " + PebRatio + "\n"
	OutString += "NebRatio = " + NebRatio + "\n\n"
}

function PrintVariables()
{
	if (PrintVarb)
	{
		OutString +=	"--------------------------------------------------------------------------------\n\n"
				+ "RUScale = 4 * 700 / 575\n"
				+ "MapScale = 1 / 3.280839895\n"
				+ "UniverseScale = 1.2\n"
				+ "MinSensorsZoomOverride = -1\n"
				+ "MaxSensorsZoomOverride = -1\n"
				+ "AdvancedGameRule = 1\n"
				+ "RandomSeedValue = {763261}\n\n"
	}
}

function PrintFunctions()
{
	OutString += "--------------------------------------------------------------------------------\n\n"
	if (PrintFunc)
	{
		var FuncObject = fso.OpenTextFile(FUNCPath, 1)
		var FuncString = FuncObject.ReadAll()
		FuncString = FuncString.replace("\r", "")
		FuncObject.Close()
		OutString += FuncString + "\n"
	}
	else
	{
		OutString += "dofilepath(\"data:scripts/levelfunc.lua\")\n\n"
//		OutString += "--placeholder\n\n"
	}
}

function PrintSquadrons()
{
	OutString += 'Squadrons =\n{\n'
	OutString += '\t-- [Amnt, Name, Type, XCoo, YCoo, ZCoo, Plyr, 0, ZAng, Race, Form]\n'
	for (var m in SquaTable)
	{
		// [Amnt, Name, Type, XCoo, YCoo, ZCoo, Plyr, 0, ZAng, Race, Form]
		var mVar = SquaTable[m]
		OutString += '\t{' + mVar[0] + ', \"' + mVar[1] + '\", \"' + mVar[2] + '\", {' + mVar[3] + ', ' + mVar[4] + ', ' + mVar[5] + ',}, ' + mVar[6] + ', {0, ' + mVar[7] + ', ' + mVar[8] + ',}, 0, 0, \"' + mVar[9] + '\", \"' + mVar[10] + '\",},\n'
	}
	OutString += '}\n\n'
}

function PrintDerelicts()
{
	OutString += 'Derelicts =\n{\n'
	OutString += '\t-- [Type, XCoo, YCoo, ZCoo, Plyr, 0, ZAng, Race]\n'
	for (var m in DerlTable)
	{
		// [Type, XCoo, YCoo, ZCoo, Plyr, 0, ZAng, Race]
		var mVar = DerlTable[m]
		OutString += '\t{\"' + mVar[0] + '\", {' + mVar[1] + ', ' + mVar[2] + ', ' + mVar[3] + ',}, ' + mVar[4] + ', {0, ' + mVar[5] + ', ' + mVar[6] + ',}, 0, 0,},\n'
	}
	OutString += '}\n\n'
}

function PrintCrystals()
{
	OutString += 'Crystals =\n{\n'
	OutString += '\t-- [Amnt, ~Name~, Type, XCoo, YCoo, ZCoo, ~0~, ~ZAng~]\n'
	for (var m in CrysTable)
	{
		// [Amnt, ~Name~, Type, XCoo, YCoo, ZCoo, ~0~, ~ZAng~]
		var mVar = CrysTable[m]
		OutString += '\t{' + mVar[0] + ', \"' + mVar[2] + '\", {' + mVar[3] + ', ' + mVar[4] + ', ' + mVar[5] + ',},},\n'
	}
	OutString += '}\n\n'
}

function PrintDistributions()
{
	OutString += 'Distributions =\n{\n'
	for (var m in DistTable)
	{
		var mVar = DistTable[m]
		OutString += '\t' + m + ' =\n\t{\n'
		for (var n in mVar)
		{
			var nVar = mVar[n]
			for (var o in nVar)
			{
				var oVar = nVar[o]
				// can't remember if both of these are necessary, or if I can just use "||"
				if (oVar.charAt(oVar.length - 1) == "\n")
					oVar = oVar.substring(0, oVar.length - 1)
				if (oVar.charAt(oVar.length - 1) == "\r")
					oVar = oVar.substring(0, oVar.length - 1)
				DistTable[m][n][o] = oVar
			}
			OutString += '\t\t' + nVar[0] + ' = ' + nVar[1] + ',\n'
		}
		OutString += '\t},\n'
	}
	OutString += '}\n\n'
}

function PrintResources()
{
	OutString += 'Resources =\n{\n'
	OutString += '\t-- [XCoo, YCoo, ZCoo, Lyot, Dist, ResA, Radi, Leng, YAng, ZAng]\n'
	for (var m in ResoTable)
	{
		var mVar = ResoTable[m]
		// [XCoo, YCoo, ZCoo, Lyot, Dist, ResA, Radi, Leng, YAng, ZAng]
		OutString += '\t{{' + mVar[0] + ', ' + mVar[1] + ', ' + mVar[2] + ',}, \"' + mVar[3] + '\", \"' + mVar[4] + '\", ' + mVar[5] + ', ' + mVar[6] + ', ' + mVar[7] + ', ' + mVar[8] + ', ' + mVar[9] + ',},\n'
	}
	OutString += '}\n\n'
}

function PrintNebulas()
{
	OutString += 'Nebulae =\n{\n'
	OutString += '\t-- [XCoo, YCoo, ZCoo, Lyot, Dist, TNum, XSiz, YSiz, ZSiz, CNum]\n'
	for (var m in NebuTable)
	{
		var mVar = NebuTable[m]
		// [XCoo, YCoo, ZCoo, Lyot, Dist, TNum, XSiz, YSiz, ZSiz, CNum]
		OutString += '\t{{' + mVar[0] + ', ' + mVar[1] + ', ' + mVar[2] + ',}, \"' + mVar[3] + '\", \"' + mVar[4] + '\", ' + mVar[5] + ', ' + mVar[6] + ', ' + mVar[7] + ', ' + mVar[8] + ', ' + mVar[9] + ',},\n'
	}
	OutString += '}\n\n'
}

function PrintSensorsZoom()
{
	OutString += "SensorsZoom = {" + SensorsZoom[0] + ", " + SensorsZoom[1] + ",}\n"
}

function PrintUniverseSize()
{
	OutString += "UniverseSize = {"
	for (var m in UniverseSize)
		OutString += UniverseSize[m] + ", "
	OutString += "}\n\n"
}

function PrintStartPoints()
{
	OutString += "StartPoints =\n{\n"
	OutString += "\t-- [XCoo, YCoo, ZCoo, ZAng]\n"
	for (var m in sPtsTable)
	{
		if (sPtsCount[m] == 1)
		{
			// [XCoo, YCoo, ZCoo, ZAng]
			var mVar = sPtsTable[m]
			OutString += "\t{" + mVar[0] + ", " + mVar[1] + ", " + mVar[2] + ", " + mVar[3] + ",},\n"
		}
	}
	OutString += "}\n\n"
}

function PrintRaces()
{
	OutString += "PlayerRaces = {"
	for (var m in sRacTable)
	{
		OutString += "\"" + sRacTable[m] + "\","
	}
	OutString += "}\n\n"
}

function PrintStartShips()
{
	OutString += "StartShips =\n{\n"
	OutString += "\t-- [Amnt, Name, Type, XCoo, YCoo, ZCoo, Plyr, 0, ZAng, Race, Form]\n"
	for (m in sShpTable)
	{
		// [Amnt, Name, Type, XCoo, YCoo, ZCoo, Plyr, 0, ZAng, Race, Form]
		var mVar = sShpTable[m]
		OutString += '\t{' + mVar[0] + ', \"' + mVar[1] + '\", \"' + mVar[2] + '\", {' + mVar[3] + ', ' + mVar[4] + ', ' + mVar[5] + ',}, ' + mVar[6] + ', {0, ' + mVar[7] + ', ' + mVar[8] + ',}, 0, 0, \"' + mVar[9] + '\", \"' + mVar[10] + '\",},\n'
	}
	OutString += "}\n\n"
}

function DebugWrite(TempString)
{
	if (MssgDebug == true)
	{
		var DebugObject = fso.OpenTextFile(DEBGPath, 8, 1, 0)
		DebugObject.Write(TempString)
		DebugObject.Close()
	}
}
