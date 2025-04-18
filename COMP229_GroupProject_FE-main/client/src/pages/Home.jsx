function Home() {
  return (
    <div className="container mt-2 min-h-screen">
      <div className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1] text-center">
        Welcome to Dragon Survey
      </div>
      <div className="overflow-auto p-8">
        <div className="text-center rounded-lg overflow-hidden w-56 sm:w-96 mx-auto">
          <img
            //className="object-cover h-48 w-full"
            //src={
            //  "https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&h=1280&q=80"
            //}
            src="./src/assets/upscaledTeamIcon.png"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
