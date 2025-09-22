import PageTemplate from "@/templates/PageTemplate";
import Button from "@/components/button";

export default function NotFound() {
  return (
    <PageTemplate>
        <div className="flex items-center justify-center h-[100%]">
            <section className="w-[35%] h-[80%] bg-base-200 rounded-xl shadow-lg p-6 flex flex-col justify-center">
                <h1 className="text-9xl font-bold text-center text-base-content mb-8 mt-10">404</h1>
                <p className="text-center text-base-content mb-12">Sorry but the page you're trying to find doesn't exist.</p>
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
