export type User1= {
  email?: string;
  name?: string;
  phoneNo?: string;
  userId?: string;
  password?: string;
  playLists?: Playlists[];
}

export type Playlists= {
  playlistId?: string;
  playlistName?: string;
  tracks?: Tracks[];
}

export type Tracks= {
  trackId?: string;
  trackName?: string;
  artistName?: string;
  duration?: string;
  musicPath?: string;
}
