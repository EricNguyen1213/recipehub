

export default function Profile() { 

    return (
        <main>
            <section className="w-full">
                <div className="bg-[url('/src/assets/images/foodCollage.jpg')] w-full h-[35vh]">

                </div>
                <div className="w-full relative pt-10">
                    <img 
                        className="rounded-full border-4 w-1/2 max-w-65 absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2"
                        src="https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg" 
                        alt="Profile Picture" 
                    />
                    <h1 className="text-center">Eric Nguyen</h1>
                </div>
            </section>

        </main>
    );
}

