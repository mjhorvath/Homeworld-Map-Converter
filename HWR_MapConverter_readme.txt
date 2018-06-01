Title: HW1 and HWC to HWRM Map Converter
Version: 1.0.1
Author: Mikali
Created: 2005/09/20
Updated: 2015/03/18
Homepage: http://isometricland.net/homeworld/homeworld.php
Discussion: http://forums.relicnews.com/showthread.php?t=73533
Homeworld Classic Maps mod: 
http://steamcommunity.com/sharedfiles/filedetails/?id=401926364


================================================================================


DESCRIPTION
This is a map converter for converting Homeworld and Homeworld: Cataclysm 
levels to work with Homeworld Remastered's Homeworld Classic Maps mod (also by 
me). It includes support for crystals, harvestable dust clouds and harvestable 
nebula, but not meteor showers, slipgates, etc.

INSTALLATION
1) Extract the contents of this archive into a folder on your harddrive.
2) Subscribe/Install the Homeworld Classic Maps mod for Homeworld Remastered.
3) Install any converted/generated maps to your 
"data\leveldata\multiplayer\homeworldclassic" folder. Create this folder if it 
doesn't already exist.

NOTE
All players must have the Homeworld Classic Maps mod installed in order to play 
against each other in multiplayer. Also, Windows Scripting Host v5.6 or greater 
must be installed in order for this converter to work. Windows Scripting Host 
comes pre-installed on Windows XP or higher I believe.

INSTRUCTIONS
There are two ways in which you can use this program:

1) You can drag & drop a single level file onto "HWR_MapConverter.js", in which 
   case a new level file will be created with the same name name and in the 
   same directory as the input file, but with an additional "HW1_" or "HWC_" 
   prefix added to the filename.

2) You can run the program from the DOS command-line. The command-line syntax 
   is as follows:

    cscript [script] [Input File] [[Output File]] [[-game HW1 or HWC]] [[-debug]] [[-rus amount]] [[-peb amount]] [[-neb amount]]

   Where:

    [script] (mandatory) is the full path to "HW2_MapConverter.js".

    [Input File] (mandatory) is the full path to the HW1 level you wish to 
    convert.

    [[Output File]] (optional) is the full path to the destination file. If 
    [Output File] is omitted, then a new file will be generated with the same 
    name and in the same directory as the input file, but with an additional 
    "HW1_" or "HWC_" prefix.

    [[-game]] (optional) tells the converter whether the original level was 
    was made for "HW1" or "HWC". If omitted, the converter defaults to "HW1".

    [[-debug]] (optional) generates and additional file in the same directory 
    as "HWR_MapConverter.js" that is useful for debugging.

    [[-rus]] (optional) specifies the desired amount for the "RUsRatio" 
    variable described below.

    [[-peb]] (optional) specifies the desired amount for the "PebRatio" 
    variable described below.

    [[-neb]] (optional) specifies the desired amount for the "NebRatio" 
    variable described below.

   There are two additional parameters that shouldn't really be used:

    [[-printfuncs]] (optional) appends the contents of "levelfunc.lua" to the 
    end of a level file.

    [[-printvarbs]] (optional) prepends additional map-tweaking variables to 
    the beginning of a level file.

   In theory, the first parameter should make it so that it is not required to 
   have a copy of "levelfunc.lua" in the "data\scripts" folder, and thus make 
   it so that maps can be traded freely over multiplayer. However, maps make 
   use of other features such as harvestable dustclouds and nebula that require 
   additional HODs and scripting.

   The second parameter is just a shortcut if you want to overwrite the 
   defaults.

ADVANCED OPTIONS
If you look in the outputted level near the top of the file, or look in 
"levelfunc.lua" near the top of the file, you'll find a number of map-tweaking 
variables. The variables in this section make it possible to change basic 
characteristics of a map without having to re-run it through the converter.

    RUsRatio        (default: 1)
    Multiplier affecting the density of resources. Smaller values mean fewer 
    resources with a higher RU value, as well as less game lag. The default 
    value of 1 means that maps will have the same number of asteroids as the 
    original file. A value of 1/4 means that the map will have one quarter the 
    number of asteroids as the original file, but that the resources will be 
    worth four times as much as usual. (Note: this is not recommended for maps 
    with small resource pockets due to round-off errors.)
        
    PebRatio        (default: 7/8)
    Multiplier to determine that some asteroids will be replaced with pebbles, 
    and the remaining asteroids' RU values will be increased proportionately. 
    The default value of 7/8 means that seven out of every eight asteroids will 
    be replaced with pebbles, but that the remaining asteroids will be worth 
    eight times as much.

    NebRatio        (default: 1/100)
    Multiplier affecting the number of nebula chunks that are generated. Nebula 
    chunks cause *a lot* of system lag, so this amount needs to be lowered by 
    a large amount. The default value of 1/100 means that 99% of nebula chunks 
    will be omitted, but that the remaining nebula chunks will be worth 100 
    times as much.

    RUScale         (default: 4 * 700 / 575)
    Is equal to HW2 frigate cost / HW1 frigate cost. Note: I then scaled this 
    by an additional factor of 4 to compensate for research/upgrade costs.

    MapScale        (default: 1 / 3.280839895)
    Is equal to the meter/feet conversion ratio (1 meter = 3.280839895 feet) 
    since HW2's units are in meters, and HW1's units are in feet.

    UniverseScale   (default: 1.2)
    Increases the world bounds (the Sensors Manager pie-plate) by an 
    additional 20%, since they seem to be a bit smaller, in HW2, in general.

    MinSensorsZoomOverride    (default: -1)
    Overrides the map's minimum sensors zoom distance. To use the map's 
    original value, set this to equal -1.

    MaxSensorsZoomOverride    (default: -1)
    Overrides the map's maximum sensors zoom distance. To use the map's 
    original value, set this to equal -1.

    AdvancedGameRule    (default: 1)
    A sophisticated gamerule is necessary to spawn the player-owned ships 
    originally designed into the map by the original author. The default value 
    of zero (false) means that only the default starting fleets will be used. 
    Note: don't turn this setting on if you don't have a gamerule that uses it.

    RandomSeedValue    (default: {763261})
    This parameter changes the seed value of the random number functions used 
    in generating the maps. Note: this number must be stored in a Lua table.


================================================================================


CREDITS

• Luke 'B1FF' Moloney for the RU conversion formulas and modded asteroids in his 
  Homeworld Classic mod.
• Saff & Kuijlaars for the sphere formula.


================================================================================


CHANGE LOG

1.0.1
• Level descriptions are now parsed and converted differently.
• The converter now appends the date the level was converted to the top of the 
  outputted level file.
• Documentation was outdated.

1.0.0
• Converted maps now only work in Homeworld Remastered, and require my 
  Homeworld Classic Maps mod.
• The converter now explicitly lists the player races in the output file.
• The converter now tracks whether the level was originally made for HW1 or 
  HWC. (You have to supply this information in the command line, however.)
• When using the -debug option, the converter now outputs a message indicating 
  whether the level conversion was successful. This is in order to avoid 
  confusion in an ambiguous situation.
• Nebulae are now stored in a separate table.
• Added support for harvestable nebulae and dust clouds. Thanks GearBox!

0.9.0
• You can now specify "RUsRatio" and "PebRatio" from the command line.
• Switched from using regular expressions to the string "split()" method in 
  several cases. Should hopefully mean the converter is less finicky about 
  inconsistencies in the source levels.
• Replaced the "-incFunctions" command-line argument with "-printfuncs" which 
  has the opposite effect.
• Derelicts and non-player ships are now stored in separate tables.
• Level descriptions are now stored in a table.
• Non-player AI-owned ships contained in maps are no longer spawned. In HW1 
  these ships would respond intelligently to your presence by turning around 
  and attacking you. In HW2 all they do is sit there and cause additional lag.
• Squadron formation settings are now exported, though I haven't taken 
  advantage of them yet.

0.8.6
• "IncFunctions.lua" and "IncVariables.lua" have been removed. The functions 
  can now tell automatically whether the tweaking variables have already been 
  defined in the level file, so "IncVariables.lua" is no longer necessary.
  "IncFunctions.lua" was removed because it is already included with HW 
  Classic, and I don't want to have to maintain the same files in multiple 
  places.
• The values of the "RUMulti" and "PebMulti" variables have been inverted, so 
  that you specify "1/5" now instead of "5". This is more natural, since HW1 
  uses more resources, and what you mostly want to do is reduce the number in 
  order to get things within HW2's bounds. Accordingly, the "RUMulti" and 
  "PebMulti" variables have been renamed to "RUsRatio" and "PebRatio" 
  respectively.
• Further, the effect of "RUsRatio" has been strengthened fourfould. I.e. if 
  you previously had a value of "8" or "16" for "RUMulti", the value for 
  "RUsRatio" should now be "1/2" or "1/4", not "1/8" or "1/16".
• Modified the level functions to use pre-seeded random number functions 
  instead of the default ones. This is in order to hopefully prevent some 
  desyncs in multiplayer.
• Level functions now automatically truncate the number of players to 6 if 
  there were originally supposed to be more than 6.
• Converter mow properly detects "sMothership" and "sCarrier" as possible 
  starting ships for Cata maps.
• Better detection for whether an HW2 equivalent for a ship has been determined 
  yet. Ideally there should be an HW2 equivalent for every ship type.
• Added support for Cataclysm crystals as well as the fifth dust cloud type. 
  They still don't blow up when fired upon, though. ;)
• Levels no longer crash if they encounter an unrecognized ship or resource 
  type. Instead, an error message will be printed to "HW2.log".
• Min and max sensor zoom sizes are applied automatically now instead of 
  needing to be initialized manually.
• Improved generation of spheres and cylinders such that asteroids and other 
  objects should no longer be concentrated near the poles or center, thereby 
  decreasing the likelihood of stuck collectors.

0.8.5
• The converter now also looks for the "UseAsMothership" and "NULL_FORMATION" 
  flags, in addition to the "Mothership" and "Carrier" types, when determining 
  which ship is the flagship. Still not perfect, but should handle nearly all 
  cases.
• Non-player mothership misspheres are now handled as if they were resource 
  misspheres. They no longer count toward a "bogus" player total.
• The converter now automatically removes ampersands and leading spaces from 
  level names.
• Increased the default value of RUMulti from 4 to 8.
• PebMulti is now set to RUMulti / 4 by default.

0.8.4
• "IncFunctions.lua" was referencing "hgn_gunplatform", which is not a valid 
  .ship file.
• "IncFunctions.lua" was referencing "hgn_flakfrigate", which is not a valid 
  .ship file.
• Fixed issue with maps sometimes appearing completely white. 
  ("IncFunctions.lua" was missing the "setGlareIntensity" and 
  "setLevelShadowColour" functions.)

0.8.3
• Slight change to the "player" table in "IncFunctions.lua".

0.8.2
• The effect of using the "-incFunctions" and "-incVariables" switches has been 
  reversed. Now, specifying the switches causes data to be read from an 
  external file using the "dofilepath" function.
• The orientation of the HW1 map-default squadrons has been corrected.

0.8.1
• Fixed the bug in "MapInclude.lua" that caused research ships to be added to a 
  sobgroup, even though they hadn't been spawned.
• Fixed the bug where a starting point was being added for every mothership, 
  regardless of the number of players.
• Fixed the bug where start points weren't being added in the correct order.
• Fixed the bug where the "number" parameter of ships in the misspheres was 
  being ignored.
• "MapInclude.lua" has been renamed to "IncFunctions.lua" and was moved to the 
  "Data" directory.
• "MapVariables.lua" has been renamed to "IncVariables.lua" and was moved to 
  the "Data" directory.
• The "-include" command-line switch has been renamed to "-incFunctions".
• Added the "-incVariables" command-line switch.
• Fixed the bug in "IncFunctions.lua" where "Vgr_HeavyMissileFrigate" was 
  misnamed as "Vgr_HeavyMissileCorvette".
• Removed the "UsePebbles" and "UseStartPoints" tweaking variables.
• Added the "UniverseScale" and "AdvancedGamerule" tweaking variables.
• The ouput now has proper carriage-returns and new-lines. (Fix didn't work in 
  last version.)
• Strings are now converted to lower-case wherever possible to cut back on 
  capitalization issues.
• Unknown level background and music name-checking is now done in the Lua 
  scripts instead of being set to a default value by the converter.

0.8.0
• Some memory and speed optimizations.
• Refactored the program code so that it uses fewer function calls. Now, the 
  program shouldn't run out of stack space when converting large file. (Didn't 
  happen very often.)
• The program no longer writes 0-byte files when it fails to convert a map.
• Tidied up the output: put the different portions of the code into clearly 
  labeled sections (e.g., converted level data first, then map-tweaking 
  variables, then map-processing functions, etc.).
• The ouput now has proper carriage-returns and new-lines. [wasn't fixed]
• Added the "-debug" and "-include" switches.
• Unknown level background and music is now set to a default value.

0.7.1
• Fixed the bug where the "MusicTable" table in "MapInclude.lua" started with 
  index number 1 instead of 0.
• Fixed the bug where a variable was misnamed in the "AddResources" function in 
  "MapInclude.lua" (and could, as a result, produce divide by zero errors).
• Fixed the bug in "MapInclude.lua" where the number of missing asteroids 
  converted into pebbles wasn't being calculated correctly when the "PebMulti" 
  variable was set to greater than 1.
• Fixed the bug where missing backgrounds weren't being handled properly.

0.7.0
• Background and music conversion has been externalized to the outputted .level 
  file. Original values are still stored in the .level files, but are then 
  compared against the "BackgroundTable" and "MusicTable" tables, respectively.
• "MapFunctions.lua" has been split into two files: "MapVariables.lua" and 
  "MapInclude.lua". "MapInclude.lua" is no longer added at the end of each 
  .level file during conversion. Rather, it resides in the "data\leveldata\" 
  folder, and is read by the .level file when the level is loaded.
• The "OverrideMinSensorsZoom" variable in "MapVariables.lua" has been renamed 
  to "MinSensorsZoomOverride".
• Added the "MaxSensorsZoomOverrride" variable to "MapVariables.lua".

0.6.3
• Fixed the bug where the program wasn't writing to the [Output File] switch 
  when it was supplied as a command-line argument.
• Added a multiplier to "MapFunctions.lua" that sets the number of missing 
  asteroids that get replaced with pebbles.
• The program no longer fails when the last line in "Description.txt" is not a 
  blank line.

0.6.2
• Fixed the bug where the world bounds were misaligned.
• Fixed the bug where the ships and starting points were still misaligned.
• Multiplied all x-coordinates by -1 to match HW2's left-handed orientation.
• 90 degrees are now subtracted from all z-axis rotations, instead of added.
• Pebbles are substituted in place of missing asteroids when "RUMulti" is set 
  to equal greater than 1.
• Fixed the length parameter for the "Cylinder" layout.
• Reduced round-off errors in RU calculations.
• The default minimum Sensors Manager zoom distance can now be overridden.
• Large asteroids are now used less often, reducing the likelihood of col-
  lectors getting "stuck".
• Various display settings of the asteroids have been modified.

0.6.1
• The program no longer fails when the last line in a level file is not a blank 
  line.
• "RUMulti" has been reduced to 4.
• RU values have been increased by a factor of 2 to cover the cost of upgrades 
  and subsystems (non-existant in HW1).
• The RU values for each asteroid type have been reduced to 100 in their 
  respective .resource files.

0.6.0
• Fixed the bug where Derelicts weren't being added and would cause the program 
  to crash.
• Fixed the bug where list entries weren't parsed properly if they were 
  separated by commas, only.
• Distributions are now parsed properly if regen amounts are also specified.
• Fixed a bug in "MapFunctions.lua" that would cause the game to crash.
• Resource amounts are now calculated properly.
• The length and radius parameters for the "Cylinder" and "Sphere" layouts are 
  now calculated in the correct order.
• The value of the "RUMulti" parameter has been set to 10 by default.
• Squadrons are now placed correctly.
• It is now possible to specify whether start points should be used (e.g. the 
  default starting fleet), or whatever the author originally intended.
• The program now works properly if "Description.txt" does not exist for the 
  level.
• All map data has now been externalized to Lua code.
• Maps are now scaled by the amount specified in the "MapScale" variable.
• Drag & drop support has been added.
• Nebulas are now converted to asteroids.

0.5.1
• Squadrons are now rotated by an additional 90 degrees.
• Fixed a bug regarding RU percentages.
• Switched to using the modded asteroids from the Homeworld Classic mod.
• Fixed the bug where DustClouds weren't being added.
• More data has been externalized.
• The prefix "HW1_" has been added to all map file names. Maps now appear with 
  the prefix "HW1 - " in the level selection menu.

0.5.0
• Initial release.


================================================================================


KNOWN ISSUES
• Add support for special Cata map objects (i.e., slipgates, mines, meteor 
  showers). This will require additional gametype scripting.
• Squadrons placed at the same coordinates should be offset a little bit (or 
  put into a sobgroup and then put into parade formation using a gamerule). 
  [Haven't actually encountered this problem, yet.]
• The converter doesn't handle whitespace properly in comma-separated lists. 
  [Bug. Doesn't occur very often. Solution: remove the offending whitespace in 
  the source file.]
• I've been coming across a lot of weird names for map backgrounds and level 
  music. Not sure what to do about them, other than to default to a known 
  background file.
• In HW1, the race of the player is specified in the level file. This causes 
  problems in HW2 when the map contains additional player-owned ships, as 
  there's no guarantee that the player will be of the same race - and, thus, 
  be unable to utilize ships effectively (or even build or research, in some 
  cases).
• It would maybe be good to configure the converter to dynamically adjust the 
  "RUsRatio" variable for maps with large numbers of objects. [This could be 
  done at runtime. I would rather that the authors do this, themselves, 
  though.]
• Can level lighting be converted?
• Default starting RU amounts are not converted.
• Maybe *only* megaliths should be used in place of ships in the "Derelicts" 
  race, as non-aligned CPU players are still able to defend themselves in HW2 
  unlike in HW1. [Update: Is that really the case? I will need to check again.]
• The "Traders" race shouldn't have any megaliths in it.
• The "P3" race should only have working ships in it.
• Need to remove ampersands in level names/descriptions. [Removing them 
  automatically seems to pose occasional problems.]
• Maybe collision boxes should be removed from asteroids? It's really the only 
  sure way to fix the stuck collectors issue on converted maps, besides looking 
  at each converted level file and manually tweaking them - a huge chore!
• See: http://hw2.tproc.org/wiki/TutorialHW1Resources.
• The converter doesn't like it when comments appear on the same line as code.
