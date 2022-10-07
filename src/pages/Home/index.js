import Ratio from 'react-bootstrap/Ratio';
import videoAds from '~/assets/videos/clip-3-ban-ngang-web-.mp4';
function Home() {
    return (
        <div style={{ width: '100%', height: 'auto' }}>
            <Ratio aspectRatio="16x9">
                <video type="video/mp4" src={videoAds} autoPlay loop muted />
            </Ratio>
        </div>
    );
}

export default Home;
