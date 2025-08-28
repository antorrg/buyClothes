export default {
  userFields: (req, res, next) => {
    const { uid, email, name, picture } = req.body
    // console.log("body: ",req.body)
    const tokenUid = req.uid
    // console.log("uid: ", tokenUid)
    if (uid !== tokenUid) { return next(eh.middError('Invalid userid', 400)) }
    req.body = {
      id: uid,
      email,
      nickname: email.split('@')[0],
      name: name || '',
      picture: picture || env.image,
      role: 1
    }
    next()
  },
  userUpgrade: (req, res, next) => {
    const { role, enabled } = req.body
    const authorizedRoles = ['User', 'Moderator', 'Admin', 'SuperAdmin']

    if (typeof enabled !== 'boolean' && typeof enabled !== 'string') {
      return next(eh.middError('Invalid enabled'))
    }
    const newEnabled = parsedBoolean(enabled)

    if (typeof role !== 'string' || role.trim().length === 0) {
      return next(eh.middError('Invalid role'))
    }
    const newRole = capitalizeFirstLetter(role.trim())

    if (!authorizedRoles.includes(newRole)) {
      return next(eh.middError('Unauthorized role', 400))
    }

    req.body.role = newRole
    req.body.enabled = newEnabled
    next()
  }
}

function capitalizeFirstLetter (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
function parsedBoolean (b) {
  if (b === true || b === 'true') {
    return true
  } else return false
}
