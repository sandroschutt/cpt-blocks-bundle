/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from "@wordpress/block-editor";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";
import { QueryControlsRealetFields } from "../components/QueryControlsRealetFields";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

import { useState, useEffect } from "react";
import { fetchGlobalPostList } from "../modules/queryFunctions";

export default function Edit({ attributes, setAttributes }) {
  const [postType, setPostType] = useState(attributes.postType);
  const [postTypeChanged, setPostTypeChanged] = useState(false);
  const [postList, setPostList] = useState(
    attributes.postsList === "" ? [] : JSON.parse(attributes.postsList)
  );
  const [mediaList, setMediaList] = useState(JSON.parse(attributes.mediaList));

  useEffect(() => {
    if (postList[0] === undefined) {
      fetchGlobalPostList(postType, setPostList, setMediaList, setAttributes);
    }

    if (postTypeChanged === true) {
      fetchGlobalPostList(postType, setPostList, setMediaList, setAttributes);
      setPostTypeChanged(false);
    }
  }, [postList, postType, postTypeChanged, mediaList]);

  return (
    <div {...useBlockProps()}>
      <QueryControlsRealetFields
        att={{ attributes: attributes, setAttributes: setAttributes }}
        type={{
          postType: postType,
          setPostType: setPostType,
          postTypeChanged: postTypeChanged,
          setPostTypeChanged: setPostTypeChanged,
        }}
      />
      <div class="query-acf-fields">
        {postList.map((post, index) => {
          return (
            <div class="field-content">
              <div>
                  <div
                    class="field-image"
                    style={{ backgroundImage: `url(${mediaList[index]})` }}
                  ></div>
              </div>
              <div class="field-footer">
                <a href={"#"}>
                  <h5>{post.title.rendered}</h5>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
