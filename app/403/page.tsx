import PageTemplate from "@/templates/PageTemplate";
import Button from "@/components/button";

export default function NotFound() {
  return (
    <PageTemplate>
        <div className="flex items-center justify-center h-[100%]">
            <section className="w-[35%] h-[80%] bg-[#333446] rounded-xl shadow-lg p-6 flex flex-col justify-center">
                <h1 className="text-9xl font-bold text-center text-white mt-5">403</h1>
                <h1 className="text-6xl font-bold text-center text-white mb-8">Forbbiden</h1>
                <p className="text-center text-white mb-12">You’re not authorized to view this page.</p>
                <div className='flex items-center justify-center'>
                    <Button
                    src="home"
                    value='back to home page'
                    type='button'
                    hoverEffect={true}
                    /> 
                </div>
            </section>
        </div>

    </PageTemplate>
  );
}