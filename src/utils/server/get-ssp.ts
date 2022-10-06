import { GetServerSideProps } from 'next';

type Props = Record<string | number, any>;

export default function createGetSSP(...getProps: (() => Props)[]) {
  const getServerSideProps: GetServerSideProps = async () => {
    if (!getProps.length) return { props: {} };
    const props: Props = {};
    const results = await Promise.all(getProps.map((fn) => fn()));
    for (const result of results) {
      Object.assign(props, result);
    }

    return { props };
  };

  return getServerSideProps;
}
