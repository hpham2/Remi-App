import YoutubeCard from "./YoutubeCard";

export type Video = {
  id: number;
  url: string;
  uploader: string;
};

type HomepageProps = {
  videoList: Video[];
};

function Homepage({ videoList }: HomepageProps) {
  return (
    <div>
      {videoList.map((youtubeVideo: Video) => {
        return (
          <YoutubeCard
            key={youtubeVideo.id}
            url={youtubeVideo.url}
            userName={youtubeVideo.uploader}
          />
        );
      })}
    </div>
  );
}

export default Homepage;
