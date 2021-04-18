import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import {List, Typography} from '@material-ui/core';
import useRouter from "@/utils/useRouter";
import NavigationListItem from "@/components/Navigation/components/NavigationListItem/NavigationListItem";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(3)
  }
}));

interface NavigationListProps {
  depth: number,
  pages: any[],
  router?: any,
}

const NavigationList = (props: NavigationListProps) => {
  const {pages, router, ...rest} = props;

  return (
    <List>
      {pages.reduce(
        (items: any, page: any) => reduceChildRoutes({router: undefined, depth: 0, items, page, ...rest}),
        []
      )}
    </List>
  );
};

interface reduceChildRoutesProps {
  router: any,
  items?: any,
  page: {
    href: string,
    icon: any,
    title: string,
    label: any,
    children: any
  },
  depth: number,
}

const reduceChildRoutes = (props: reduceChildRoutesProps) => {
  const {router, items, page, depth} = props;

  if (page.children) {
    const open = ''
    items.push(
      <NavigationListItem
        depth={depth}
        icon={page.icon}
        key={page.title}
        label={page.label}
        open={Boolean(open)}
        title={page.title}
      >
        <NavigationList
          depth={depth + 1}
          pages={page.children}
          router={router}
        />
      </NavigationListItem>
    );
  } else {
    items.push(
      <NavigationListItem
        depth={depth}
        href={page.href}
        icon={page.icon}
        key={page.title}
        label={page.label}
        title={page.title}
      />
    );
  }
  return items;
};

interface NavigationProps {
  component?: any,
  className?: string,
  pages: any[],
  title?: string,
}

const Navigation: React.FunctionComponent<NavigationProps> = (props: NavigationProps) => {
  const {title, pages, className, component: Component, ...rest} = props;
  const classes = useStyles();
  const router = useRouter();

  return (
    <Component
      {...rest}
      className={clsx(classes.root, className)}
    >
      {title && <Typography variant="overline">{title}</Typography>}
      <NavigationList
        depth={0}
        pages={pages}
        router={router}
      />
    </Component>
  );
};

export default Navigation;
