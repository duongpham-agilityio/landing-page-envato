import Loading from '..';

describe('Loading component', () => {
  it('Match with snapshot', () => {
    const { container } = render(<Loading />);

    expect(container).toMatchSnapshot();
  });
});
