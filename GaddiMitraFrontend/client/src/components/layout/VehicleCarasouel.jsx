import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

//  const { data: stats } = useQuery({ queryKey: ["/api/dashboard/stats"] });


export default function VehicleCarasouel() {
    const { data: info } = useQuery({ queryKey: ["/api/vehicles+users"] });
const vehicles = info?.vehicles || [];
  return (
    <section className="py-5 bg-gray-100" id="testimonials">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          {/* <span className="text-orange-600 uppercase tracking-wider font-semibold text-sm">
            Hot Deals
          </span> */}
           <h2 className="font-bold text-gray-800 text-3xl text-center mb-4">Hot Deals</h2>
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
          {vehicles.map((vehicle, i) => (
            <SwiperSlide key={i}>
              <Card key={vehicle.id} className="card-hover cursor-pointer">
                <div className="relative">
                  <img
                    src={vehicle.imageurl}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    className="w-full h-22 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-3 right-3 bg-orange-600">
                    {vehicle.year}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {vehicle.brand} {vehicle.model}
                  </h3>
                  <p className="text-gray-600 mb-4  line-clamp-1">{vehicle.description}</p>

                  <div className="flex justify-between items-center mb-4">
                    <div className="flex gap-2">
                      <Badge variant="secondary">{vehicle.fueltype}</Badge>
                      <Badge variant="secondary">{vehicle.transmission}</Badge>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-orange-600">
                      ₹{(parseInt(vehicle.price) / 100000).toFixed(1)}L
                    </span>
                    <Button size="sm">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
