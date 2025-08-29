export default function Aboutus(){
    return(
        <>
        
        <section className="py-24 relative">
            
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
            <div className="w-full justify-start items-center gap-8 grid lg:grid-cols-2 grid-cols-1">
                <div className="w-full flex-col justify-start lg:items-start items-center gap-10 inline-flex">
                    <div className="w-full flex-col justify-start lg:items-start items-center gap-4 flex">
                        <h2 className="text-gray-900 text-5xl font-bold font-manrope leading-normal lg:text-start text-center mb-4">¡Tu tienda de mascotas de confianza!</h2>
                        <p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">Creemos que las mascotas son parte de la familia. Por eso, nos dedicamos a ofrecer no solo productos, sino también un espacio donde tú y tu mascota se sientan bienvenidos. Colaboramos con expertos y otras organizaciones para crear un ambiente donde todos puedan encontrar lo que necesitan para cuidar a sus mejores amigos.</p>
                    </div>
                    {/* <button className="sm:w-fit w-full px-3.5 py-2 bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 ease-in-out rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex">
                        <span className="px-1.5 text-white text-sm font-medium leading-6">Get Started</span>
                    </button> */}
                </div>
                <img className="lg:mx-0 mx-auto h-full rounded-3xl object-cover" src="https://i.pinimg.com/736x/40/8b/8b/408b8be30984bdd7579416a6cb114275.jpg" alt="about Us image" />
            </div>
        </div>
    </section>
        </>
    )
}
    

