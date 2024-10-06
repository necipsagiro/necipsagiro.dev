import { getCookies } from "jsr:@std/http";
import { Handlers, FreshContext } from "$fresh/server.ts";
import { Head } from "$fresh/src/runtime/head.ts";
import { Separator } from '../../components/Separator.tsx';
import { CourseSelector } from '../../islands/CourseSelector.tsx';

export const handler: Handlers = {
  GET(req: Request, ctx: FreshContext) {
    let courses: string[] = [''];

    try {
      courses = [...JSON.parse(getCookies(req.headers).courses), ''];
    } catch (error) {
      console.log('invalid courses cookie', error);
    };

    return ctx.render({
      courses: courses,
    });
  },
};

interface SenlikciProps {
  data: {
    courses: string[];
  };
};

export default function Senlikci(props: SenlikciProps) {
  return (
    <>
      <Head>
        <title key='title'>boun şenlikçi</title>
      </Head>
      <h1 class='text-3xl'>boun şenlikçi</h1>
      <Separator />
      <p>quick add yapmak istediğiniz derslerin kodlarını ve section'larını örnekteki gibi aşağıdaki kutulara girin.</p>
      <p>ders kodlarını ve sectionları doğru yazdığınızdan emin olun. hata varsa çalışmayacaktır.</p>
      <CourseSelector courses={props.data.courses} />
      <Separator />
      <p>yukarıdaki butonu tarayıcıdaki yer işaretleri çubuğuna sürükleyin ve kaydedin.</p>
      <p>yer işaretleri çubuğu görünmüyorsa tarayıcı ayarlarından görünür hale getirin.</p>
      <Separator />
      <p>ders kayıt ekranı yüklendiğinde yer işaretleri çubuğundaki butona tıklarsanız istediğiniz dersler quick add yapılacaktır.</p>
    </>
  );
};
