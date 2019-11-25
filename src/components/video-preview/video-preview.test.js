import React from "react";
import {shallow} from "enzyme";
import {VideoPreview} from "./video-preview";

it(`video player renders properly`, () => {
  const tree = shallow(<VideoPreview
    poster = {`img/macbeth.jpg`}
    previewSrc = {`https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`}
  />);

  expect(tree).toMatchSnapshot();
});
