import React, { useEffect, useState } from "react";
import {initialQuestionState, Question, useVideojs} from "../../hooks/use-video-js";

import 'video.js/dist/video-js.css';

type Video = {
    id_videos: number,
    description: string,
    source: string,
    title: string
    display_options_at: number
    options: Question[]
}

const videoData: Video[] = [{
    id_videos: 1,
    description : "Video 1",
    source : "https://interactive-video-web.s3.amazonaws.com/WhatsApp+Video+2021-03-28+at+21.50.27.mp4",
    title : "Video 1",
    display_options_at: 3,
    options: [
        {
            option: 'Lindinho',
            correct: false
        },
        {
            option: 'Lindão',
            correct: true
        }
    ]
}, {
    id_videos: 2,
    description : "Video 2",
    source : "https://interactive-video-web.s3.amazonaws.com/video.mp4",
    title : "Video 2",
    display_options_at: 2,
    options: [
        {
            option: 'continuar',
            correct: false
        },
        {
            option: 'Sair',
            correct: true
        }
    ]
}];

const VideoPlayer: React.FC = () => {
    const [video, setVideo] = useState<Video>();
    const [questions, setQuestions] = useState<any>();

    useEffect(() => {
        setVideo(videoData[0]);
    }, []);

    const onPlay = (currentTime?: number) => {
        console.log("Video played at: ", currentTime);
    };

    const onPause = (currentTime?: number) => {
        console.log("Video paused at: ", currentTime);
    };

    const onEnd = (currentTime?: number, selected?: Question) => {
        console.log(`Video ended at ${currentTime}`);
        setQuestions(null);

        if (!selected?.correct) {
            replay();
            return;
        }

        const newVideoData = videoData.filter((v) => v.id_videos != video?.id_videos);

        setVideo(newVideoData[0]);
        autoPlay();
        setSelected(initialQuestionState);
    };

    const onTimeUpdate = (currentTime: number) => {
        if (typeof video === 'undefined' ) {
            return;
        }

        if (currentTime > video.display_options_at) {
            setQuestions(<VideoQuestion onClick={setSelected} questions={ video.options } />);
        }
    };


    const {
        vjsId,
        vjsRef,
        vjsClassName,
        replay,
        autoPlay,
        selected,
        setSelected
    } = useVideojs({
        src: video?.source as string,
        autoplay: false,
        controls: true,
        responsive: true,
        bigPlayButtonCentered: true,
        onPlay,
        onPause,
        onEnd,
        onTimeUpdate,
    });

    return (
        <section className="main-container">
            <h1>{ video?.title }</h1>
            <div data-vjs-player>
                <video ref={ vjsRef } id={ vjsId } className={ vjsClassName } />
                { !selected.correct ? questions : <Feedback correct={ selected.correct } />}
            </div>
        </section>

    );
}

type VideoQuestionProps = {
    questions: Question[],
    onClick: Function
}
const VideoQuestion: React.FC<VideoQuestionProps> = ({questions, onClick}) => {
    return (
        <div className='overlay'>
            <div className='videoButtonWrapper'>
                {
                    questions.map((question, key) => (
                        <button
                            key={ key }
                            style={{
                                fontSize: '20px',
                                padding: '10px'
                            }}
                            className="btn btn-outline-dark btn-question"
                            onClick={() => onClick(question)}
                        >
                            { question.option }
                        </button>
                    ))
                }
            </div>
        </div>
    );
}

type FeedbackProps = {
    correct: boolean
}
const Feedback: React.FC<FeedbackProps> = ({ correct }) => {
    return correct

        ? <div className="alert alert-success">Acertou</div>
        : <div className="alert alert-danger">Errou</div>;
}

export default VideoPlayer;