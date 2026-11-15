// Add new categories here, then add their description keys to every locale.
export const categories = [
  {
    id: 'omarchy',
    name: 'Omarchy',
    descriptionKey: 'omarchyDescription',
    compatibilityKey: 'compatibility',
    projects: [
      { name: 'Dock', key: 'dock' },
      { name: 'Launchpad', key: 'launch' },
      { name: 'Bar', key: 'bar' },
    ],
  },
  {
    id: 'user-script',
    name: 'User Script',
    descriptionKey: 'userScriptDescription',
    compatibilityKey: 'userScriptCompatibility',
    projects: [
      { name: 'Auto Hide YouTube Header', key: 'youtubeHeader', sourceUrl: 'https://github.com/Okumai/UserScripts/tree/master/AutoHideYouTubeHeader', installUrl: 'https://github.com/Okumai/UserScripts/raw/refs/heads/master/AutoHideYouTubeHeader/AutoHideYouTubeHeader.user.js' },
      { name: 'Auto YouTube Shorts', key: 'youtubeShorts', sourceUrl: 'https://github.com/Okumai/UserScripts/tree/master/AutoYouTubeShorts', installUrl: 'https://github.com/Okumai/UserScripts/raw/refs/heads/master/AutoYouTubeShorts/AutoYouTubeShorts.user.js' },
    ],
  },
];
