const PageHeading = ({ title }: { title: string }) => {
  return (
    <div className="mb-3">
      <h3 className="text-3xl text-light_primary dark:text-dark_primary italic capitalize ">
        {title}
      </h3>
    </div>
  );
};

export default PageHeading;
