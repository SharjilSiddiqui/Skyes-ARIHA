# 3D Virtual Tour - Scene Persistence System

This project implements a comprehensive scene persistence system for a 3D virtual tour with multiple floors and rooms.

## Features

### 🏢 Multi-Floor Navigation
- **17th Floor**: Complete apartment layout
- **23rd Floor**: Complete apartment layout  
- **28th Floor**: Complete apartment layout
- **33rd Floor**: Complete apartment layout

### 🚪 Room Types Available
Each floor contains the following room types:
- `entrance` - Main entrance
- `hall` - Hallway/entrance hall
- `passage` - Passageway
- `kitchen` - Kitchen area
- `bedroom01` - Primary bedroom
- `bedroom02` - Secondary bedroom
- `bedroom02_1` - Secondary bedroom section 1
- `bedroom02_2` - Secondary bedroom section 2
- `bedroom03_1` - Third bedroom section 1
- `bedroom03_2` - Third bedroom section 2

### 🔄 Scene Persistence
The system automatically maintains your current room type when switching between floors:
- If you're in "bedroom01" on the 17th floor and switch to the 28th floor, you'll automatically go to "bedroom01" on the 28th floor
- If the exact room doesn't exist on the target floor, it defaults to the entrance

## How to Use

### Floor Navigation
1. Use the floor navigation buttons at the top of the screen
2. Click on any floor button (17F, 23F, 28F, 33F) to switch floors
3. The system will automatically navigate to the same room type on the new floor

### Keyboard Shortcuts
- **Ctrl+1**: Switch to 17th Floor
- **Ctrl+2**: Switch to 23rd Floor  
- **Ctrl+3**: Switch to 28th Floor
- **Ctrl+4**: Switch to 33rd Floor
- **Ctrl+D**: Debug scene persistence

### Direct Navigation via URL
You can directly navigate to specific floors and rooms using URL parameters:
```
index.htm?floor=17th&room=bedroom01
index.htm?floor=23rd&room=kitchen
index.htm?floor=28th&room=bedroom02
index.htm?floor=33rd&room=entrance
```

## Technical Implementation

### Core Functions

#### `switchFloor(targetFloor)`
- Handles floor switching while maintaining room type
- Automatically finds the corresponding scene on the target floor
- Updates UI state and saves to localStorage

#### `getRoomFromSceneName(sceneName)`
- Parses scene names to determine room type
- Handles complex room names (e.g., "bedroom02 1" → "bedroom02_1")

#### `getFloorFromSceneName(sceneName)`
- Extracts floor information from scene names
- Supports 17th, 23rd, 28th, and 33rd floors

#### `setupTracking()`
- Monitors scene changes in real-time
- Updates current floor and room tracking
- Automatically saves state changes

### State Management
- **Current Floor**: Tracks which floor the user is currently on
- **Current Room**: Tracks which room type the user is currently in
- **Local Storage**: Persists scene state across browser sessions
- **URL Parameters**: Supports direct navigation to specific scenes

### UI Components
- **Floor Navigation**: Buttons for each floor with active state highlighting
- **Room Indicator**: Shows current floor and room information
- **Debug Button**: Provides detailed logging for troubleshooting

## File Structure
```
├── index.htm              # Main virtual tour file with scene persistence
├── script.js              # 3DVista tour script
├── lib/                   # 3DVista library files
├── media/                 # Tour media assets
├── test_scene_persistence.html  # Test page for functionality
└── README.md              # This documentation
```

## Testing

1. Open `index.htm` in your browser
2. Navigate to different rooms on any floor
3. Use the floor navigation buttons to switch floors
4. Verify that you maintain the same room type when switching floors
5. Use the Debug button to see detailed state information
6. Test keyboard shortcuts for quick navigation

## Browser Compatibility
- Modern browsers with ES6 support
- Local storage support required for state persistence
- 3DVista player compatibility

## Troubleshooting

### Debug Information
Click the "Debug" button to see:
- Current floor and room
- Available scenes on current floor
- Scene change events
- State tracking information

### Common Issues
- **Scene not found**: Check if the room type exists on the target floor
- **Floor not switching**: Ensure the tour is fully loaded before navigation
- **State not persisting**: Check browser localStorage support and permissions

## Future Enhancements
- Room history tracking
- Favorite locations
- Custom navigation paths
- Analytics and usage tracking
- Mobile-optimized navigation

## Support
For technical support or questions about the scene persistence system, refer to the debug console output or contact the development team.
