import YoutubeCard from "./YoutubeCard";

type HomepageProps = {
  videoList: any[];
};

function Homepage({ videoList }: HomepageProps) {
  return (
    <div>
      {videoList.map((youtubeVideo: { url: string; uploader: string }) => {
        return (
          <YoutubeCard
            url={youtubeVideo.url}
            userName={youtubeVideo.uploader}
          />
        );
      })}
    </div>
  );
}

export default Homepage;
