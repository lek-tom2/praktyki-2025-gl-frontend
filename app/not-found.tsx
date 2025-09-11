"use client";
import PageTemplate from "@/templates/PageTemplate";
import Button from "@/components/button";
import useTranslation from "@/lang/useTranslation";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <PageTemplate>
      <div className="flex items-center justify-center h-[100%]">
        <section className="w-[35%] h-[80%] bg-[#333446] rounded-xl shadow-lg p-6 flex flex-col justify-center">
          <h1 className="text-9xl font-bold text-center text-white mb-8 mt-10">404</h1>
          <p className="text-center text-white mb-12">{t("notFound.description") || "Sorry but the page you're trying to find doesn't exist."}</p>
          <div className='flex items-center justify-center'>
            <Button
              src="home"
              value={t("notFound.backToHome") || 'back to home page'}
              type='button'
              hoverEffect={true}
            /> 
          </div>
        </section>
      </div>
    </PageTemplate>
  );
}
