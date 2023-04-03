import './QuickPost.css';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { EffectCoverflow, Navigation, Pagination } from 'swiper';
import { FaPen } from 'react-icons/fa';

function QuickPost() {
  return (
    <section className="quick-post">
      <div className="qp-main">
        <h1>Write something new!</h1>
        <button className="qp-btn">
          <FaPen />
        </button>
      </div>
      <div className="qp-secondary"></div>
    </section>
  );
}

export default QuickPost;
