# HwrmMapConverter

## DESCRIPTION
This is a map converter for converting Homeworld and Homeworld: Cataclysm levels to work with Homeworld Remastered's Homeworld Classic Maps mod (also by me). It includes support for crystals, harvestable dust clouds and harvestable nebula, but not meteor showers, slipgates, etc.

## INSTALLATION
1. Extract the contents of this archive into a folder on your harddrive.
2. Subscribe/Install the Homeworld Classic Maps mod for Homeworld Remastered.
3. Install any converted/generated maps to your "data\leveldata\multiplayer\homeworldclassic" folder. Create this folder if it doesn't already exist.

## NOTE
All players must have the Homeworld Classic Maps mod installed in order to play against each other in multiplayer. Also, Windows Scripting Host v5.6 or greater must be installed in order for this converter to work. Windows Scripting Host comes pre-installed on Windows XP and higher I believe.

## INSTRUCTIONS
There are two ways in which you can use this program:

1. You can drag & drop a single level file onto "HWR_MapConverter.js", in which case a new level file will be created with the same name name and in the same directory as the input file, but with an additional "HW1_" or "HWC_" prefix added to the filename.

2. You can run the program from the Windows command prompt. The command-line syntax is as follows:

       cscript [script] [Input File] [[Output File]] [[-game HW1 or HWC]] [[-debug]] [[-rus amount]] [[-peb amount]] [[-neb amount]]

   Where:

       [script] (mandatory) is the full path to "HW2_MapConverter.js".

       [Input File] (mandatory) is the full path to the HW1 level you wish to convert.

       [[Output File]] (optional) is the full path to the destination file. If [Output File] is omitted, then a new file will be generated with the same name and in the same directory as the input file, but with an additional "HW1_" or "HWC_" prefix.

       [[-game]] (optional) tells the converter whether the original level was was made for "HW1" or "HWC". If omitted, the converter defaults to "HW1".

       [[-debug]] (optional) generates and additional file in the same directory as "HWR_MapConverter.js" that is useful for debugging.

       [[-rus]] (optional) specifies the desired amount for the "RUsRatio" variable described below.

       [[-peb]] (optional) specifies the desired amount for the "PebRatio" variable described below.

       [[-neb]] (optional) specifies the desired amount for the "NebRatio" variable described below.

   There are two additional parameters that shouldn't really ever be used:

       [[-printfuncs]] (optional) appends the contents of "levelfunc.lua" to the end of a level file.

       [[-printvarbs]] (optional) prepends additional map-tweaking variables to the beginning of a level file.

   In theory, the first one should make it so that players won't need to have a copy of "levelfunc.lua" in their "data\scripts" folder, and thus make it possible for maps to be traded freely over multiplayer. However, maps make use of other features, such as harvestable dustclouds and nebula, that require additional HODs and scripting, and thus cannot be shared easily without including the rest of the mod as well. Further, GearBox disabled the feature in Homeworld Remastered where players could host custom maps and share them with other players over GameSpy or Steam without the other players needing to download them beforehand.

   The second parameter is just a shortcut for when you want to overwrite the default settings.

## ADVANCED OPTIONS
If you look in the outputted level near the top of the file, or look in "levelfunc.lua" near the top of the file, you'll find a number of map-tweaking variables. The variables in this section make it possible to change basic characteristics of a map without having to re-run it through the converter.

    RUsRatio        (default: 1)
    Multiplier affecting the density of resources. Smaller values mean fewer resources with a higher RU value, as well as less game lag. The default value of 1 means that maps will have the same number of asteroids as the original file. A value of 1/4 means that the map will have one quarter the number of asteroids as the original file, but that the resources will be worth four times as much as usual. (Note: this is not recommended for maps with small resource pockets due to round-off errors.)
        
    PebRatio        (default: 7/8)
    Multiplier to determine that some asteroids will be replaced with pebbles, and the remaining asteroids' RU values will be increased proportionately. The default value of 7/8 means that seven out of every eight asteroids will be replaced with pebbles, but that the remaining asteroids will be worth eight times as much.

    NebRatio        (default: 1/100)
    Multiplier affecting the number of nebula chunks that are generated. Nebula chunks cause *a lot* of system lag, so this amount needs to be lowered by a large amount. The default value of 1/100 means that 99% of nebula chunks will be omitted, but that the remaining nebula chunks will be worth 100 times as much.

    RUScale         (default: 4 * 700 / 575)
    Is equal to HW2 frigate cost / HW1 frigate cost. Note: I then scaled this by an additional factor of 4 to compensate for research/upgrade costs.

    MapScale        (default: 1 / 3.280839895)
    Is equal to the meter/feet conversion ratio (1 meter = 3.280839895 feet) since HW2's units are in meters, and HW1's units are in feet.

    UniverseScale   (default: 1.2)
    Increases the world bounds (the Sensors Manager pie-plate) by an additional 20%, since they seem to be a bit smaller, in HW2, in general.

    MinSensorsZoomOverride    (default: -1)
    Overrides the map's minimum sensors zoom distance. To use the map's original value, set this to equal -1.

    MaxSensorsZoomOverride    (default: -1)
    Overrides the map's maximum sensors zoom distance. To use the map's original value, set this to equal -1.

    AdvancedGameRule    (default: 1)
    A sophisticated gamerule is necessary to spawn the player-owned ships originally designed into the map by the original author. The default value of zero (false) means that only the default starting fleets will be used. Note: don't turn this setting on if you don't have a gamerule that uses it.

    RandomSeedValue    (default: {763261})
    This parameter changes the seed value of the random number functions used in generating the maps. Note: this number must be stored in a Lua table.

## HOME PAGE

You can find my homepage and other Homeworld maps and tools at:

http://isometricland.net
