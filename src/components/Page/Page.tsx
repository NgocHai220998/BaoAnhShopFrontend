import React from 'react';
import Typography from "@material-ui/core/Typography";

interface PageProps {
  children?: any,
  title: string,
  className?: string,
  heading?: string;
}

const Page: React.FunctionComponent<PageProps> = (props: PageProps) => {
  const {title, className, children, heading} = props;
  return (
    <div className={className}>
      <div>
        <title>{title}</title>
      </div>
      {
        heading ? (
          <Typography
            variant="h4"
          >
            {heading}
          </Typography>
        ) : null
      }
      {children}
    </div>
  );
};

export default Page;
