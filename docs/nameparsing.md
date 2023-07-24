Parsing names from behindthename.com and surnames.behindthename.com

Put this into the console of the page, it wil spit out a JSON array of objects. should work in personal and surname pages

```
let names = [];
document.querySelectorAll('.browsename').forEach((n) => {
    const nlink = n.querySelector('.listname a');
    nlink.querySelector('span.nn')?.remove();
    const gender = n.querySelector('.listgender')?.innerText || '';
    names.push({
        name: nlink.innerText,
        gender
    });
});
JSON.stringify(names);
```

Past that into a file, remove extra quotes and such to join all the pages you parsed into one big array.

```
const data = {
    male: [],
    female: [],
    surname: []
};

names.forEach((obj) => {
    if (obj.gender === 'f') {
        data.female.push(obj.name);
    } else if (obj.gender === 'm') {
        data.male.push(obj.name);
    } else if (obj.gender !== '') {
        // m & f or f & m
        data.female.push(obj.name);
        data.male.push(obj.name);
    } else {
        data.surname.push(obj.name);
    }
});

console.log(JSON.stringify(data));
```

Then reformat and get into the names.js file.
