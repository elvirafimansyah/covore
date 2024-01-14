const Container = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return ( 
    <main className='mx-auto px-4 sm:px-6 md:px-8 xl:px-0 max-w-6xl'>
      {children}
    </main>
  );
}
export default Container;