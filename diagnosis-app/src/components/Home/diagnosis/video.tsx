import ReactPlayer from 'react-player';

export default function MyVideoPlayer() {
  return (
    <div className='player-wrapper' style={{ width: '100%', height: '500px' }}>
      <ReactPlayer
        url='https://www.youtube.com/watch?v=V-WiPnTXXU0'
        width='100%'
        height='100%'
        controls={true}
      />
    </div>
  );
}
