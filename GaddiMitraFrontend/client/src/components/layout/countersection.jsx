import { useEffect, useRef, useState } from "react";

const CounterItem = ({ end, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          animateCount();
          hasAnimated.current = true;
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const animateCount = () => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 30);

    const animate = () => {
      start += increment;
      if (start < end) {
        setCount(Math.floor(start));
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animate();
  };

  return (
    <div
      ref={ref}
      className="col-md-6 col-lg-3 flex justify-center counter-wrap py-6 mx-5"
    >
      <div className="block-18 text-center">
        <div className="text d-flex flex-col items-center border p-4 rounded-lg shadow bg-white">
          <strong className="text-4xl font-bold text-orange-600">{count}</strong>
          <span className="text-gray-700 mt-2 text-center">{label}</span>
        </div>
      </div>
    </div>
  );
};

export default function CounterSection() {
  return (
    <section className="bg-gray-100  py-5" id="section-counter">
      <div className="container mx-auto px-4">
        <div className="row flex flex-wrap justify-center">
          <CounterItem end={60} label={"Year\nExperienced"} />
          <CounterItem end={1090} label={"Total\nDealers"} />
          <CounterItem end={2590} label={"Happy\nCustomers"} />
          <CounterItem end={67} label={"Total\nService Centers"} />
        </div>
      </div>
    </section>
  );
}
