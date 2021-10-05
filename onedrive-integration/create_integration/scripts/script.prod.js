!(function(e, t) {
	for (var r in t) e[r] = t[r];
})(
	this,
	(function(e) {
		var t = {};
		function r(n) {
			if (t[n]) return t[n].exports;
			var i = (t[n] = { i: n, l: !1, exports: {} });
			return e[n].call(i.exports, i, i.exports, r), (i.l = !0), i.exports;
		}
		return (
			(r.m = e),
			(r.c = t),
			(r.d = function(e, t, n) {
				r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
			}),
			(r.r = function(e) {
				'undefined' != typeof Symbol &&
					Symbol.toStringTag &&
					Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
					Object.defineProperty(e, '__esModule', { value: !0 });
			}),
			(r.t = function(e, t) {
				if ((1 & t && (e = r(e)), 8 & t)) return e;
				if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
				var n = Object.create(null);
				if (
					(r.r(n),
					Object.defineProperty(n, 'default', { enumerable: !0, value: e }),
					2 & t && 'string' != typeof e)
				)
					for (var i in e)
						r.d(
							n,
							i,
							function(t) {
								return e[t];
							}.bind(null, i)
						);
				return n;
			}),
			(r.n = function(e) {
				var t =
					e && e.__esModule
						? function() {
								return e.default;
							}
						: function() {
								return e;
							};
				return r.d(t, 'a', t), t;
			}),
			(r.o = function(e, t) {
				return Object.prototype.hasOwnProperty.call(e, t);
			}),
			(r.p = ''),
			r((r.s = 0))
		);
	})([
		function(e, t, r) {
			'use strict';
			r.r(t),
				r.d(t, 'searchByRequestInternal', function() {
					return J;
				}),
				r.d(t, 'searchByRequest', function() {
					return M;
				}),
				r.d(t, 'debug', function() {
					return H;
				});
			const n = library.load('buffer').Buffer;
			function i(e = a(), t = s) {
				return (r) => o(e, t)(r).then((e) => e.json());
			}
			function o(e = a(), t = s) {
				return async (r) =>
					t(r)
						? Promise.resolve(r)
						: (async function(e, t) {
								let r;
								'function' == typeof e
									? (r = await e(t))
									: (console.error(
											`Response error = ${await t.text()}, status=${t.status}: ${t.statusText}`
										),
										(r = e));
								return r instanceof Error ? Promise.reject(r) : Promise.reject(new Error(r));
							})(e, r);
			}
			function s(e) {
				return e.ok;
			}
			function a(e = 'Response status') {
				return (t) => new Error(`${e}: ${t.status} ${t.statusText}`);
			}
			function u(e) {
				return async (t) => {
					const r = `${e}: ${t.status}`;
					return console.error(`${r} ${await t.text()}`), new Error(r);
				};
			}
			const c = {
					file: 'file',
					title: 'title',
					path: 'path',
					creator: 'creator',
					uploadDate: 'uploadDate',
					size: 'size'
				},
				l = {
					itemId: 'itemId',
					contentType: 'contentType',
					mimeType: 'mimeType',
					title: 'title',
					path: 'path',
					creator: 'creator',
					uploadDate: 'uploadDate',
					size: 'size',
					parentId: 'parentId',
					foundIn: 'foundIn'
				},
				f = (Object.values(c), Object.values(l)),
				d = [ 'and', 'options', 'or', 'order-by', 'return', 'contentType' ],
				p = 'file',
				m = 'folder';
			function y(e) {
				const { and: t, or: r, equals: n, ftcontains: i } = e;
				if (Array.isArray(r)) return h('OR', r);
				if (Array.isArray(t)) return h('AND', t);
				if (n) {
					if (n.attr === c.file) return n.value;
					throw new Error('Unsupported attribute in equals: ' + n.attr);
				}
				if (i) {
					if (i.attr === c.file || null == i.attr) return i.value;
					throw new Error('Unsupported attribute in ftcontains: ' + i.attr);
				}
				throw new Error('Unsupported tokens in query: ' + Object.keys(e));
			}
			function h(e, t) {
				if (0 === t.length) return '';
				{
					const r = t.map(y).join(` ${e} `);
					return 1 === t.length ? r : `(${r})`;
				}
			}
			const b = {
					[c.file]: 'filename',
					[c.title]: 'title',
					[c.path]: 'filename',
					[c.creator]: 'createdBy',
					[c.uploadDate]: 'createdDateTime',
					[c.size]: 'size'
				},
				g = 'https://graph.microsoft.com/v1.0',
				v = (Object.values(b),
				{
					[l.itemId]: 'id',
					[l.contentType]: '__generated_value__',
					[l.foundIn]: '__generated_value__',
					[l.mimeType]: 'fields.mimeType',
					[l.title]: 'fields.fileName',
					[l.path]: 'webUrl',
					[l.creator]: 'createdBy.user.displayName',
					[l.uploadDate]: 'createdDateTime',
					[l.size]: 'fields.size',
					[l.parentId]: 'parentReference.id',
					siteId: 'parentReference.siteId',
					findKeyForValue: function(e) {
						const t = Object.entries(this).filter(([ t, r ]) => e === r).map(([ e ]) => e)[0];
						if (void 0 === t)
							throw new Error('ResponseAttributesMapping element not found by value = ' + e);
						return t;
					},
					findValue: function(e) {
						const t = this[e];
						return '__generated_value__' !== t ? t : void 0;
					}
				}),
				w = Object.values(v).filter((e) => '__generated_value__' !== e && 'function' != typeof e),
				_ = library.load('lodash');
			function I(e) {
				var t;
				const { attributes: r } = null !== (t = null == e ? void 0 : e.return) && void 0 !== t ? t : {};
				return null == r || (Array.isArray(r) && 0 === r.length)
					? w
					: r.map((e) => v.findValue(e)).filter((e) => !!e);
			}
			function $(e) {
				return (t) => {
					try {
						let r = '';
						t.value.map((e) => {
							e.hitsContainers.map((e) => {
								var t;
								r = ((t = e.hits), Array.isArray(t) ? t : []).map(T);
							});
						});
						const n = (function(e) {
							return _.uniq([ ...I(e), v[l.itemId], v[l.parentId], v.siteId ]);
						})(e);
						return r.map((e) => {
							const t = Object.entries(e)
								.map(([ e, t ]) => {
									if (n.includes(e.slice(9))) {
										return [ v.findKeyForValue(e.slice(9)), t ];
									}
									return [];
								})
								.filter((e) => e.length > 0)
								.reduce((e, [ t, r ]) => ((e[t] = r), e), {});
							return { ...t, foundIn: A(t), contentType: q(t) };
						});
					} catch (e) {
						throw new Error(`mapResponseAttributes Error ${e.message} ${e.stack}`);
					}
				};
			}
			function O(e, t) {
				return t ? `${t}.${e}` : e;
			}
			function T(e) {
				return Object.entries(e).reduce(
					(e, [ t, r ]) => (
						j(r)
							? (function e(t, r, n) {
									return Object.entries(n).forEach(([ n, i ]) => {
										j(i) ? e(t, O(n, r), i) : (t[O(n, r)] = i);
									});
								})(e, t, r)
							: null != r && (e[t] = r),
						e
					),
					{}
				);
			}
			function j(e) {
				return null !== e && 'object' == typeof e;
			}
			function q(e) {
				return e.mimeType.includes('Folder') ? m : p;
			}
			function A(e) {
				const t = e.path,
					r = t.match(/^([^:]+:\/\/)(.*)$/);
				return Array.isArray(r) && 3 === r.length ? r[2] : t;
			}
			function S(e) {
				const t = [];
				return (
					null == e ||
						(e.attributes && !Array.isArray(e.attributes)
							? t.push({
									error: 'return_attributes_not_array',
									message: 'return.attributes might be omitted or must be an array.'
								})
							: e.attributes &&
								(N(e).length > 0 &&
									t.push({
										warning: 'return_attributes_not_string',
										message: 'return.attributes elements must be strings but found ' + N(e)
									}),
								R(e).length > 0 &&
									t.push({
										warning: 'return_attributes_unsupported_value',
										message: 'return.attributes contains unsupported values = ' + R(e)
									}))),
					t
				);
			}
			function E(e) {
				const t = [],
					r = Object.keys(e).filter((e) => !d.includes(e));
				return (
					r.length > 0 &&
						t.push({
							warning: 'query_contains_unsupported_element',
							message: '"query" property contains unsupported elements: ' + r
						}),
					t
				);
			}
			function N(e) {
				return e.attributes.map((e) => typeof e).filter((e) => 'string' !== e);
			}
			function R(e) {
				return e.attributes
					.map((e) => ({ type: typeof e, element: e }))
					.filter((e) => 'string' === e.type && !f.includes(e.element))
					.map(({ element: e }) => e);
			}
			class P {
				static encode(e) {
					return (function(e) {
						return n.from(e, 'utf8').toString('base64');
					})(e);
				}
				static convertHeaders(e) {
					return Array.isArray(e) ? e : Object.entries(e).map(([ e, t ]) => ({ name: e, value: t }));
				}
				constructor(...e) {
					let t, r, n;
					'object' == typeof e[0] ? ({ statusCode: t, headers: r, body: n } = e[0]) : ([ t, r, n ] = e),
						(this.statusCode = t || 200),
						(this.headers = P.convertHeaders(r || {})),
						(this.body = P.encode(n || ''));
				}
			}
			function z(e) {
				return 401 === e.status
					? e.text().then(x).then((e) => {
							throw e;
						})
					: e;
			}
			function x(e) {
				return new P({ statusCode: 401, body: e });
			}
			function C(e) {
				return e instanceof P ? e : new P({ body: e, statusCode: 200 });
			}
			function D(e) {
				if (null != e) {
					if ('string' == typeof e) return e;
					if (e instanceof Error || (null != e && e.message)) {
						let t = e.message;
						return e.stack && (t = `${t}\n${e.stack}`), t;
					}
					{
						const t = JSON.stringify(e);
						return '{}' === t ? String(e) : t;
					}
				}
			}
			const U = {
				entityTypes: [ 'listItem' ],
				query: {},
				fields: [
					'id',
					'fileName',
					'createdDateTime',
					'webUrl',
					'createdBy',
					'parentReference',
					'size',
					'mimeType'
				],
				from: 0,
				size: 9
			};
			var k = function(e, t, r) {
				const { from: n, size: i } = (function(e) {
					const { page: t } = e || {},
						{ from: r, size: n } = t || {},
						i = parseInt(r, 10),
						o = parseInt(n, 10);
					return { from: Number.isNaN(i) ? 1 : i, size: Number.isNaN(o) ? 50 : o };
				})(t);
				return {
					requests: [
						{
							...U,
							query: { ...U.query, queryString: e },
							fields: Array.isArray(r) && r.length > 0 ? r : U.fields,
							from: n,
							size: i
						}
					]
				};
			};
			const B = library.load('lodash');
			async function J({ client: e, parameters: t }) {
				const r = ((o = t.requestBody), n.from(o, 'base64').toString('utf8'));
				var o;
				const s = JSON.parse(r),
					a = [ ...E((c = s).query), ...S(c.return) ];
				var c, l;
				if (a.filter((e) => !!e.error).length > 0)
					return (
						(l = {
							error: {
								message: 'Request contains validation errors. Unable to continue.',
								errors: a.filter((e) => !!e.error),
								warning: a.filter((e) => !!e.warning)
							}
						}),
						new P({ statusCode: 400, body: l })
					);
				a.filter((e) => !!e.warning).length > 0 &&
					a.filter((e) => !!e.warning).forEach(({ warning: e, message: t }) => {
						console.warn(`Request validation contains warning: code=${e}, message=${t}`);
					});
				const f = y(s.query),
					d = g + '/search/query',
					p = await (async function(e, t) {
						const r = await t
							.fetch(g + '/sites/root')
							.then(i(`Graph request to '${g}/sites/root' failed`))
							.then((e) => ({ results: e }));
						return `${e} path:"${r.results.webUrl}"`;
					})(f, e),
					m = k(p, s.options);
				return e
					.fetch(d, {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(m)
					})
					.then(z)
					.then(i(`Graph request to '${d}' failed`))
					.then($(s))
					.then(
						(function(e, t) {
							return (e) =>
								(function(e, t) {
									return (async function(e, t) {
										const r = B.uniq(t.map((e) => e))
											.filter(
												(e) =>
													!!(e.parentId && e.siteId && e.itemId) ||
													(console.warn(
														"postProcessAttributes - checking parentIds, siteIds & itemId's and found empty id, probably 'parentId/siteId/itemId' attribute mapping error?"
													),
													!1)
											)
											.map((e) => ({
												url: `/sites/${e.siteId}/drive/items/${e.parentId}/children`,
												method: 'GET',
												id: e.itemId
											}));
										if (0 === r.length) return Promise.resolve({});
										let n = 0,
											o = 20,
											s = [];
										do {
											const t = r.slice(n, o),
												a = g + '/$batch',
												c = {
													method: 'POST',
													headers: { 'Content-Type': 'application/json' },
													body: JSON.stringify({ requests: t })
												};
											await e
												.fetch(a, c)
												.then(i(u("Can't fetch drive items for updating webURL")))
												.then(({ responses: e }) => {
													e.forEach((e) => {
														s.push(e);
													});
												}),
												(n = o),
												(o += 20);
										} while (n < r.length);
										return s
											.map(({ id: e, body: { value: t } }) => ({ id: e, value: t }))
											.filter((e) => !!e.value)
											.map(({ id: e, value: t }) =>
												t
													.map((t) => ({ id: e, webUrl: t.webUrl, eTag: t.eTag }))
													.filter((t) => !!t.eTag.includes(e))
											)
											.reduce((e, t) => ((e[t[0].id] = t[0].webUrl), e), {});
									})(e, t).then(
										(function(e) {
											return (t) =>
												e.map((e) => {
													const r = t[e.itemId];
													if (r && 'Document' != e.mimeType) {
														const t = r;
														return { ...e, path: t };
													}
													return e;
												});
										})(t)
									);
								})(t, e);
						})(0, e)
					)
					.then((e) => ({ results: e }))
					.then(JSON.stringify);
			}
			const M = ((G = J),
			(...e) => {
				try {
					const t = G(...e);
					return t instanceof P
						? t
						: t instanceof Promise
							? t
									.then(C)
									.catch(
										(e) => (
											console.error(
												`Caught unexpected error in withHttpResponse wrapper: ${e instanceof
													String} ${e instanceof Error} ${e} ${D(e)}`
											),
											buildErrorResponse(e)
										)
									)
							: Promise.resolve(C(t));
				} catch (e) {
					return (
						console.error('Caught unexpected error in withHttpResponse wrapper: ' + D(e)),
						Promise.resolve(buildErrorResponse(e))
					);
				}
			});
			var G;
			function H({ parameters: e }) {
				return console.log('Got parameters', JSON.stringify(e)), JSON.stringify(e);
			}
		}
	])
);
