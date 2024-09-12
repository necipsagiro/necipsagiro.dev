export default (req, res) => {
  req.session.courses = Array.isArray(req.body.courses) ? req.body.courses : [];

  return res.send({ ok: true });
};
