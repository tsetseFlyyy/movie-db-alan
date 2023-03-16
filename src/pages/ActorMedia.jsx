import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import ImageViewer from "react-simple-image-viewer";
import axios from "axios";

export const ActorMedia = () => {
  const { id } = useParams();
  const [actorBackground, setActorBackground] = useState();
  const [mediaArray, setMediaArray] = useState();
  const [mediaArrayImages, setMediaArrayImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  let mediaImages = [];

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  useEffect(() => {
    const actorInfoURL = `https://api.themoviedb.org/3/person/${id}?api_key=5d55a3cba36b527e0435c9a070f8f04f&language=en-US`;
    axios.get(actorInfoURL).then((response) => {
      setActorBackground(response.data);
      console.log(response.data);
    });
    const movieMediaUrl = `https://api.themoviedb.org/3/person/${id}/images?api_key=5d55a3cba36b527e0435c9a070f8f04f`;
    axios.get(movieMediaUrl).then((response) => {
      console.log(response.data.profiles);
      setMediaArray(response.data.profiles);
      response.data.profiles.map((image) => {
        mediaImages.push(
          `https://image.tmdb.org/t/p/original${image.file_path}`
        );
      });
      setMediaArrayImages(mediaImages);
    });
  }, []);
  return (
    <div className="container">
      <h2 className="detail" style={{ marginTop: 70 }}>
        Media of{" "}
        {actorBackground != null ? (
          <span style={{ color: "rgb(240, 170, 35)" }}>
            {actorBackground.name}
          </span>
        ) : (
          <></>
        )}
      </h2>
      <div className="movies-container wrapper" style={{ paddingTop: 0 }}>
        {mediaArray != null ? (
          mediaArray.map((image, index) => {
            return (
              <img
                className="pointer actor-media"
                onClick={() => openImageViewer(index)}
                key={index}
                style={{ marginTop: 50 }}
                src={`https://image.tmdb.org/t/p/w200${image.file_path}`}
                alt=""
              />
            );
          })
        ) : (
          <></>
        )}
      </div>
      {isViewerOpen && (
        <ImageViewer
          src={mediaArrayImages}
          currentIndex={currentImage}
          onClose={closeImageViewer}
          disableScroll={false}
          backgroundStyle={{
            backgroundColor: "rgba(0,0,0,0.9)",
          }}
          closeOnClickOutside={true}
        />
      )}
    </div>
  );
};
