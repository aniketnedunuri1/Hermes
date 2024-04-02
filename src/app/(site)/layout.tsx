import loadAuthPageData from '~/lib/server/loaders/load-auth-page-data';
import AuthPageShell from '~/app/auth/components/AuthPageShell';

// async function SiteLayout(props: React.PropsWithChildren) {
//   const { session, language } = await loadUserData();

//   return (
//     <I18nProvider lang={language}>
//       <SiteHeaderSessionProvider data={session} />

//       {props.children}

//       <Footer />
//     </I18nProvider>
//   );
// }

// export default SiteLayout;

async function SiteLayout({ children }: React.PropsWithChildren) {
  const { language } = await loadAuthPageData();
  return (
    
    <AuthPageShell language={language}>{children}</AuthPageShell>
  );
}
  
  export default SiteLayout;
