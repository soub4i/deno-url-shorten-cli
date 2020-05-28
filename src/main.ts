const { args: [url] } = Deno;
import { red, green, blue, bold } from "https://deno.land/std/fmt/colors.ts";

const baseURL: string = "https://cleanuri.com/api/v1/"



function isUrlValid(input: string) {
    const regexQuery = "^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$";
    var url = new RegExp(regexQuery, "i");
    return url.test(input);
}

async function shortify(url: string): Promise<{ result_url: string }> {

    if (url === "" || url === undefined) {
        throw { error: "Please provide an url" };

    }

    if (!isUrlValid(url)) {
        throw { error: "Please provide a valid url" };
    }

    const options = {
        method: 'POST', headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
    };
    const res = await fetch(`${baseURL}shorten`, options);
    const data = await res.json();
    return data;
}

try {

    const { result_url } = await shortify(url);
    console.log(blue(`${bold('Long URL:')}: ${url}`))
    console.log(green(`${bold('Short URL:')} ${result_url} `))


} catch ({ error }) {

    console.log(red(`Error: ${error}`))

}

