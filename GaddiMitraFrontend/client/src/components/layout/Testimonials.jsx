import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Roger Scott",
    position: "Marketing Manager",
    image: "https://ackodrive.com/_next/image/?url=https%3A%2F%2Fackodrive.ackoassets.com%2Fnext_assets%2F5fb208d6de0a2bf5ddbd410b73762de9cc636036%2F_next%2Fstatic%2Fimages%2FreviewerImage1-176eac285be0c4262c7308c1739f0983.png&w=1920&q=75",
    feedback:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.",
  },
  {
    name: "Emily Davis",
    position: "Interface Designer",
    image: "https://ackodrive.com/_next/image/?url=https%3A%2F%2Fackodrive.ackoassets.com%2Fnext_assets%2F5fb208d6de0a2bf5ddbd410b73762de9cc636036%2F_next%2Fstatic%2Fimages%2FreviewerImage2-ba07d22f8d72b3be9e1aefb4a4239e75.png&w=1920&q=75",
    feedback:
      "Amazing service! The vehicle was in perfect condition and the staff was very helpful.",
  },
  {
    name: "John Miller",
    position: "UI Designer",
    image: "https://ackodrive.com/_next/image/?url=https%3A%2F%2Fackodrive.ackoassets.com%2Fnext_assets%2F5fb208d6de0a2bf5ddbd410b73762de9cc636036%2F_next%2Fstatic%2Fimages%2FreviewerImage1-176eac285be0c4262c7308c1739f0983.png&w=1920&q=75",
    feedback:
      "I found my dream car at the best price. Highly recommend this platform!",
  },
  {
    name: "Priya Verma",
    position: "Web Developer",
    image: "https://ackodrive.com/_next/image/?url=https%3A%2F%2Facko-cms.ackoassets.com%2FMG_Cyberster_HP_407711f5af.webp&w=1920&q=75",
    feedback:
      "The user interface is super smooth and the whole process was hassle-free.",
  },
 
];

export default function TestimonialSection() {
  return (
    <section className="py-5 bg-gray-100" id="testimonials">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          {/* <span className="text-orange-600 uppercase tracking-wider font-semibold text-sm">
            Testimonial
          </span> */}
          <h2 className="text-4xl font-bold text-gray-800 mt-2">Happy Clients</h2>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
        //   pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="bg-white p-6 rounded-xl shadow-md text-center h-full flex flex-col justify-between">
                <div>
                  <div
                    className="w-20 h-20 mx-auto rounded-full bg-center bg-cover border-4 border-orange-500"
                    style={{ backgroundImage: `url(${t.image})` }}
                  ></div>
                  <p className="mt-6 text-gray-600 italic">"{t.feedback}"</p>
                </div>
                <div className="mt-6">
                  <p className="font-bold text-lg text-gray-800">{t.name}</p>
                  <p className="text-sm text-orange-600">{t.position}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
