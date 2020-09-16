const c = () => {};
const d = () => {};
const e = () => {};

async function a() {
  var f = await c()
    .catch((err) => {
      console.log(err);
    })
    .then();
    
  console.log(f);

  await e();
}

async function b() {
  await d();
}
