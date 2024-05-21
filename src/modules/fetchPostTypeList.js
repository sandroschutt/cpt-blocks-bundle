import axios from "axios";

export async function fetchPostTypesList(setPostTypeList) {
    axios
        .get(`${window.location.origin}/wp-json/wp/v2/cpt-post-types`)
        .then((response) => {
            setPostTypeList(response.data)
        })
        .catch((error) => console.log(error))
}