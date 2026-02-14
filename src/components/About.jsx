import { Award, Users, Building2, Target } from "lucide-react"
import amd_Estate from "../assets/amd_real.png";
const About = () => {
  const features = [
    {
      icon: Award,
      title: "Excellence",
      description: "Over 10 years of excellence in real estate services",
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "15+ professional agents with local market expertise",
    },
    {
      icon: Building2,
      title: "Properties",
      description: "20+ premium properties across Ahmedabad",
    },
    {
      icon: Target,
      title: "Customer Focus",
      description: "100% client satisfaction guaranteed",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Us</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Your trusted partner in finding the perfect property in Ahmedabad
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-16 rounded-2xl overflow-hidden shadow-2xl">
          <img src={amd_Estate} alt="About Us" className="w-full h-189 object-cover" />
        </div>

        {/* Story Section */}
        <div className="mb-16 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            <p>
              Founded in 2014, RealEstate Pro has been at the forefront of Ahmedabad's real estate market, helping
              thousands of families find their dream homes and investors discover lucrative opportunities.
            </p>
            <p>
              We specialize in residential and commercial properties across prime locations in Ahmedabad, including
              Satellite, Prahlad Nagar, Iscon, Sindhu Bhavan Road, and many more areas. Our team of experienced
              professionals brings deep local market knowledge and a commitment to excellence.
            </p>
            <p>
              Whether you're looking to rent, buy, or sell property, we provide personalized service, transparent
              dealings, and expert guidance throughout your real estate journey.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="inline-flex p-3 rounded-lg bg-blue-100 dark:bg-blue-900/20 mb-4">
                <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="leading-relaxed opacity-90">
              To simplify the real estate process and make property transactions transparent, efficient, and hassle-free
              for every client we serve.
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-8 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="leading-relaxed opacity-90">
              To be Ahmedabad's most trusted real estate platform, known for integrity, innovation, and exceptional
              customer service.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Start Your Property Journey?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Let our expert team help you find the perfect property
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold">
            Contact Us Today
          </button>
        </div>
      </div>
    </div>
  )
}

export default About
