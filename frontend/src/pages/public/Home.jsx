import Navbar from "../../components/Navbar"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 pt-32 pb-16">
        
        {/* Left Side - Text */}
        <div className="max-w-xl">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Revise Qur’an <span className="text-green-600">Together</span>
          </h1>
          <p className="mt-6 text-lg text-gray-700">
            A platform for students, teachers, and huffāẓ to rehearse, review, 
            and strengthen their Qur’an memorization in a collaborative way.
          </p>
          <div className="mt-8">
            <a
              href="#"
              className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition"
            >
              Get Started
            </a>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="mt-10 md:mt-0 md:ml-12">
          <img
            src="https://images.unsplash.com/photo-1597047084897-51e8a8c04a1c" 
            alt="Muslims listening to Qur’an"
            className="rounded-2xl shadow-lg w-full max-w-md object-cover"
          />
        </div>
      </section>
    </div>
  )
}
