import { Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface Testimonial {
    title: string;
    role: string;
    review: string;
    avatar: string; // URL of the avatar image
}

const Testimonials = () => {
    const testimonials: Testimonial[] = [
        { title: "Shashwat Singh", role: "Ted-Ed Speaker", review: "I saw the website of magic-canvas and that seemed really cool for me!", avatar: "https://media.licdn.com/dms/image/v2/D4D03AQHfRVerEP8keg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1690726046565?e=1756944000&v=beta&t=Nz8dIs-bi0_noCUtU5SGv1EPe-wW97nEEInVOXX2o_0" },
        {
            title: "Nipurn Goyal", role: "", review: "@Apple walo rakhlo ise kaam ka banda hai", avatar: "https://media.licdn.com/dms/image/v2/D5603AQG6A5MFDGdu-g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1726691673016?e=1756944000&v=beta&t=iLWIbHkvUi-azvBx9pcUcJD7T4DS4848ub_QIB3ijuE"
        },
        { title: "Priyanshi Choudhary", role: "", review: "I absolutely love the UI, recognition is quick and quite accurate. Highly recommended.", avatar: "https://media.licdn.com/dms/image/v2/D4E03AQH3TNHG-1QWAA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1722893296804?e=1756944000&v=beta&t=looki4nsIoR3V1t9b8zYkuHKcwfz2kwUu2jPuW2vtgw" },
        { title: "Naval Bihani", role: "", review: "Great project! Building a functionality of this huge is an achievement! 💪🏻", avatar: "https://media.licdn.com/dms/image/v2/D5603AQGyQsm_GIAYPQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1731268071460?e=1756944000&v=beta&t=xTNPqUCmjlsQ4VreKf4TnC1EMEFvV1CbZscicuty_gM" },
    ];

    const socialLinks = [{ icon: <Twitter size={30} />, link: "https://twitter.com/deevee47" }, { icon: <Linkedin size={30}/>, link: "https://linkedin.com/in/deevee47" }];

    return (
        <div className="w-full flex flex-col justify-center items-center px-4 sm:px-8 lg:px-16 py-10">
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold text-center mb-6">
                लोगो ka काम hai कहना 🫢
            </h1>

            <div className="grid p-10 sm:p-20 sm:w-[70%] w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 sm:gap-8">
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="relative">
                        <div className="absolute animate-pulse -inset-1 bg-gradient-to-r from-purple-800/70 via-pink-800/70 to-blue-800/70 w-[90%] h-[60%] my-auto mx-auto rounded-full blur-md"></div>
                        <div className="relative bg-blue-900/50 backdrop-blur-3xl rounded-2xl p-4">
                            <div className="flex items-center mb-4">
                                <img
                                    src={testimonial.avatar}
                                    alt={`${testimonial.title} avatar`}
                                    className="w-12 h-12 rounded-full mr-4"
                                    width={48}
                                    height={48}
                                />
                                <div>
                                    <h1 className="text-2xl">{testimonial.title}</h1>
                                    <h3 className="text-gray-400">{testimonial.role}</h3>
                                </div>
                            </div>
                            <p>{testimonial.review}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex flex-col justify-center items-center italic opacity-50 pb-10 pt-10 text-md sm:text-lg text-center">
                Adding More Testimonials Soon! Want me to add yours?
                <span className="text-gray-200 mt-2">
                    Share reviews on:
                </span>
                
                <div className="flex gap-6">
                    {socialLinks.map((link, index) => (<Link
                        key={index}
                        href={link.link}
                        className="mt-2 flex items-center text-blue-400 hover:text-blue-700 transition duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {link.icon}
                    </Link>))}
                </div>
                </div>
        </div>
    );
};

export default Testimonials;
